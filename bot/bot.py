
# TOKEN: 5657540208:AAHsz1MXNNKVfDGnvozyeFMIIgxzll1zU4Q
from telegram.ext import Updater, CallbackContext, CommandHandler
from telegram import Update, WebAppInfo
from telegram import InlineKeyboardButton, InlineKeyboardMarkup
import logging
import requests
from PIL import Image
from urllib.request import urlopen
from io import BytesIO

logging.basicConfig(filename='logsofbot.txt', format='%(asctime)s - %(name)s - %(levelname)s -%(message)s',
                    level=logging.INFO)

TOKEN = '5657540208:AAHsz1MXNNKVfDGnvozyeFMIIgxzll1zU4Q'
updater = Updater(TOKEN, use_context=True)
dispatcher = updater.dispatcher

webapp_url = 'https://skorzi1.pythonanywhere.com/'

def start(update: Update, context: CallbackContext):
    update.message.reply_text('*Пропиши "/" или Тыкни на кнопочку слева внизу*',
                    parse_mode='Markdown')
    

def get_a_reasons(grade, res, message):
    for table in res.json():
        message += (f'*От: {table["userName"]}* {grade} *Для: {table["for_model"]}*\n'
        f'*Причина: "{table["reason"]}"*, *Описание: "{table["description"]}"* \n'
        f'---------------------------------------------------\n\n')
    return message

def likesreasons(update: Update, context: CallbackContext):
    try:
        res = requests.get(url=f'{webapp_url}/api/createlike')
        message = ''
        grade = 'лайк'
        update.message.reply_text(get_a_reasons(grade, res, message),
                            parse_mode='Markdown')
    except Exception:
        update.message.reply_text('*Лайков нету*', parse_mode='Markdown')
        
def dislikesreasons(update: Update, context: CallbackContext):
    try:
        res = requests.get(url=f'{webapp_url}/api/createdislike')
        message = ''
        grade = 'дизлайк'
        update.message.reply_text(get_a_reasons(grade, res, message),
                                parse_mode='Markdown')
    except Exception:
        update.message.reply_text('*Дизлайков нету*', parse_mode='Markdown')

#
def resizeImage(url):
    bio = BytesIO()
    bio.name = 'image.jpeg'
    img = Image.open(urlopen(url))
    img.thumbnail(size=(250,250))
    img.save(bio, 'JPEG')
    bio.seek(0)
    return bio

    
def topList(update: Update, context: CallbackContext):
    res = requests.get(url=f'{webapp_url}/api/modellist')
    message = ''
    topNum = 0
    for table in res.json():
        topNum += 1
        message = (f'_#{topNum}_  *{table["name"]}:    {table["likes"]} 👍    ' 
                    f'{table["dislikes"]}* 💩\n')

        img = resizeImage(table['photo'])

        context.bot.send_photo(update._effective_chat.id, img,
                            message, parse_mode="Markdown")


def main():
    updater.dispatcher.add_handler(CommandHandler('start', start))
    updater.dispatcher.add_handler(CommandHandler('top', topList))
    updater.dispatcher.add_handler(CommandHandler('likes', likesreasons))
    updater.dispatcher.add_handler(CommandHandler('dislikes', dislikesreasons))
    updater.start_polling()
    updater.idle()


if __name__ == '__main__':
    main()
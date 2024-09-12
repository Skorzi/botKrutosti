import React from 'react'

function getAmount(username, setAmount){
    // const [amountGrades, setAmountGrages] = useState({username: 'none', amount_likes: 6, amount_dislikes: 2})
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/getUserTg?username=' + 'Skor1') 
        .then(res => {
            console.log(amountGrades.amount_likes)
            setAmountGrages(res.data[0])
        })
        .catch(err => {
            console.error(err); 
            setAmount({username: 'none', amount_likes: 6, amount_dislikes: 2})
        })
    }, [])

}

export default function useAmount(username) {
    const [amountGrades, setAmount] = useState()
    getAmount(username, setAmount)
    return amountGrades
}

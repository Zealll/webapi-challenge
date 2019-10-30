const express = require('express')

const router = express.Router()

let chores = [
    {
        id: 1,
        description: "chores description",
        notes: "chores notes",
        assignedTo: 1,
        completed: false
    },
    {
        id: 2,
        description: "chores description",
        notes: "chores notes",
        assignedTo: 1,
        completed: true
    },
    {
        id: 3,
        description: "chores description",
        notes: "chores notes",
        assignedTo: 2,
        completed: false
    }
]

let users = [
    {
        id: 1,
        name: 'Elan'
    }
]


router.get('/', (req, res) => {
    const complete = req.query.completed
   
    !complete ? res.json(chores) : res.json(chores.filter(eachChore => eachChore.completed === JSON.parse(complete)))
})


router.get('/:id', checkChore, (req, res) => {
    const {id} = req.params
    // chores.filter(eachChore => {
    //     console.log(eachChore.id == id)
    //     // const chore = eachChore.id === id
    //     res.json(eachChore.id == id)
    // })
    users.map(eachUser => {
        if(eachUser.id == id) {
           chores = chores.filter(eachChore => eachChore.assignedTo == id)
           res.json(chores)
        } else {
            res.status(404).json({message: "User Can't be Found"})
        }
    })
    
})


let id = 3
router.post('/', (req, res) => {
    
    const {description, notes, assignedTo, completed} = req.body
    const newChore = {id: id+1, description, notes, assignedTo, completed: completed || false}
    if(!description || !assignedTo) {
        res.status(401).json({message: "Fill out the necessary fields"})
    } else {
        id++

        chores.push(newChore)
        res.json(newChore)
    }
    
})

router.put('/:id', checkChore, (req, res) => {
    const {id} = req.params
    const {description, notes, assignedTo, completed} = req.body

    chores.map(eachChore => {
        if(eachChore.id == id) {
           if (description) eachChore.description = description
           if (notes) eachChore.notes = notes
           if (assignedTo) eachChore.assignedTo = assignedTo
           if (completed) eachChore.completed = completed
        }
    })
})

router.delete('/:id', checkChore, (req, res) => {
    const {id} = req.params
    chores = chores.filter(eachChore => eachChore.id != id)
    res.status(200).json({message: "Succesfully deleted"})
})


function checkChore(req, res, next) {
    const obj = chores.find(chore => chore.id == req.params.id)
    !obj ? res.status(404).json({message: 'No chore found'}) : next()
}



module.exports = router
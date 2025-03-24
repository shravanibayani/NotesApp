const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log("give password as argument")
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://shravanibayani02:${password}@cluster0.kjxnn.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content:String,
    important:Boolean,
})

const Note = mongoose.model('Note',noteSchema)

// const note = new Note({
//     content : 'I am Smart',
//     important:true
// })

// note.save().then(result=>{
//     console.log('note saved!')
//     mongoose.connection.close()
// })
const notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true
    },
    {
        id: "2",
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

// Note.insertMany(notes)
// .then(result=>{
//     console.log("all notes saved !")
//     mongoose.connection.close()
// })


Note.find({important:true}).then(result=>{
    result.forEach(note=>{
        console.log(note)
    })
    mongoose.connection.close()
})

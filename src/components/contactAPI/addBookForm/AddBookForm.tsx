
import { useState } from "react"

const defaultBookForm = {
    title: "",
    serie: "",
    volume: "",
    author: "",
    category: "",
    summary: "",
    opinion: "",
    type: "",
    returned: false,
    lent: false,
    borrower: "",
}


const AddBookForm = () => {

    const [bookForm, setBookForm] = useState(defaultBookForm)

    const handleTextAreaChange = (event : React.ChangeEvent<HTMLTextAreaElement>)=>{
        const{name, value} = event.target
        setBookForm((data) => ({
            ...data,
            [name]: value
        }))
    }

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>)=>{
        const{name, value, type,checked} = event.target

        setBookForm((data) => ({
            ...data,
            [name]: type==="checkbox"? checked : value
        }))
    }

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(bookForm)
        setBookForm(defaultBookForm)
    }

    const handleReset = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setBookForm(defaultBookForm)}

    return (
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <div>
                <label htmlFor="title">Titre</label>
                <input type="text" id="title" name="title" value={bookForm.title} onChange={handleChange}/>
            </div>
            
            <div>
                <label htmlFor="serie">Série</label>
                <input type="text" id="serie" name="serie" value={bookForm.serie} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="volume" >Tome</label>
                <input type="text" id="volume" name="volume" value={bookForm.volume} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="author">Auteur</label>
                <input type="text" id="author" name="author" value={bookForm.author} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="category">Genre</label>
                <input type="text" id="category" name="category" value={bookForm.category} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="summary">Résumé</label>
                <textarea name="summary" id="summary" value={bookForm.summary} onChange={handleTextAreaChange}/>
            </div>
            <div>
                <label htmlFor="opinion">Appréciation</label>
                <input type="text" id="opinion" name="opinion" value={bookForm.opinion} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="type">Type
                <input type="radio" value={"Kindle"} id="kindle" name="kindle" onChange={handleChange} checked={bookForm.type === "Kindle"}/>
                <label htmlFor="kindle">Kindle</label>
                <input type="radio" value={"Papier"} id="paper" name="paper" onChange={handleChange} checked={bookForm.type === "Papier"}/>
                <label htmlFor="paper">Papier</label>
                </label>
            </div>
            <div>
                <label htmlFor="returned">Retourné</label>
                <input type="checkbox" id="returned" name="returned"/>
            </div>
            <div>
                <label htmlFor="lent">Prêté</label>
                <input type="checkbox" id="lent" name="lent" />
            </div>
            <div>
                <label htmlFor="borrower">Emprunteur</label>
                <input type="text" id="borrower" name="borrower"/>
            </div>

            <div>
                <button type="submit">Ajouter</button>
                <button type="reset">Annuler</button>
            </div>



        </form>
    
    )
}

export default AddBookForm
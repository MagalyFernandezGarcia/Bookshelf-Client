import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react"
import { FormBook, CreateBook, BookSchema} from "../../../types/Book";

const defaultBookForm: FormBook = {
    title: "",
    serie: "",
    volume: 1,
    author: "",
    category: "",
    summary: "",
    opinion: undefined,
    type: "",
    returned: false,
    lent: false,
    borrower: "",
}



const AddBookForm = () => {
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: (form : CreateBook) => axios.post("http://localhost:8000/books", form),
        mutationKey: ["/books"],
        onSuccess: () => {
            
            queryClient.invalidateQueries({ queryKey: ["/books"] })
          },
      })

    const [bookForm, setBookForm] = useState<FormBook>(defaultBookForm)

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
        
        
        

        // validation via zod
        //BookSchema =>importation du schéma défini pour le formulaire.
        //safeParse => valide le formulaire + signale les erreurs sans faire cracher le code
        const {success, error, data: validatedBook} = BookSchema.safeParse(bookForm)

        if(success) {
           console.log(validatedBook);
           

            mutate(validatedBook)
            
        } else {
            console.log(validatedBook);
            console.log( error);
            
            
        }
        handleReset(event)

        
    }

    const handleReset = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setBookForm(defaultBookForm)}



        

        const handelRadioSelection = (event : React.ChangeEvent<HTMLInputElement>)=>{
            handleChange(event)

           
            
            const{ value} = event.target
           
            if(value === "Kindle" ){
                return <div>
                       <label htmlFor="returned">Retourné</label>
                        <input type="checkbox" id="returned" name="returned" onChange={handleChange} />
                    </div>
                    } else if(value=== "Papier"){
                        return  <div>
                        <label htmlFor="lent">Prêté</label>
                        <input type="checkbox" id="lent" name="lent" onChange={handleChange} />
                    </div>
                    }
                
            }
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
                <label htmlFor="opinion">Appréciation
                <input type="radio" id="opinion0" name="opinion" value={undefined} checked={bookForm.opinion === undefined}  style={{ display: 'none' }} // Option cachée, mais sécurisée
        readOnly />    
                <input type="radio" id="opinion1" name="opinion" value={1} onChange={handleChange} />
                <label htmlFor="opinion1">1</label>
                <input type="radio" id="opinion2" name="opinion" value={2} onChange={handleChange} />
                <label htmlFor="opinion2">2</label>
                <input type="radio" id="opinion3" name="opinion" value={3} onChange={handleChange} />
                <label htmlFor="opinion3">3</label>
                <input type="radio" id="opinion4" name="opinion" value={4} onChange={handleChange} />
                <label htmlFor="opinion4">4</label>
                <input type="radio" id="opinion5" name="opinion" value={5} onChange={handleChange} />
                <label htmlFor="opinion5">5</label>
                </label>
            </div>
            <div>
                <label htmlFor="type">Type
                <input type="radio" value={"Kindle"} id="kindle" name="type" onChange={ handelRadioSelection } checked={bookForm.type === "Kindle"}/>
                <label htmlFor="kindle">Kindle</label>
                <input type="radio" value={"Papier"} id="paper" name="type" onChange={handelRadioSelection} checked={bookForm.type === "Papier"}/>
                <label htmlFor="paper">Papier</label>
                
      
                </label>
            </div>
            
            {bookForm.type === "Kindle" && (
        <div>
          <label htmlFor="returned">Retourné</label>
          <input
            type="checkbox"
            id="returned"
            name="returned"
            onChange={handleChange}
          />
        </div>
      )}
      {bookForm.type === "Papier" && (
        <div>
          <label htmlFor="lent">Prêté</label>
          <input
            type="checkbox"
            id="lent"
            name="lent"
            onChange={handleChange}
          />
        </div>
      )}
      {bookForm.lent && (
        <div>
          <label htmlFor="borrower">Emprunteur</label>
          <input
            type="text"
            id="borrower"
            name="borrower"
            onChange={handleChange}
            required
          />
        </div>
      )}
      
           
           

            <div>
                <button type="submit">Ajouter</button>
                <button type="reset">Annuler</button>
            </div>
           



        </form>
    
    )
}

export default AddBookForm



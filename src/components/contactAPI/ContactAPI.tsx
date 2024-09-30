import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fragment } from "react";


export type Book = {
    _id: string,
    title: string,
    serie: string,
    volume: number,
    author: string,
    category: String,
    sumamry: string,
    finished: boolean,
    opinion: number,
    type: string,
    returned: boolean,


    
}


const ContactAPI = () => {

    const { data: response, isLoading } = useQuery({
        queryFn: () => axios.get("http://localhost:8000/books"),
        queryKey: ["/books"],
      })

      if(isLoading) {
        return <div>Loading ...</div>
      }

      if(response === undefined) {
        return <div>Something went wrong...</div>
      }

      const dataArray = response.data
    

    return(<Fragment>
        <h1>test</h1>
        <ul>
        {dataArray.map((book : Book  ) => {
          
          return <li key={book._id}>{book.title}</li>}
          
        )}
      </ul>
    </Fragment>);
}


export default ContactAPI
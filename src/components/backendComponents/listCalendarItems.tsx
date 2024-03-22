import styled from "styled-components";
import supabase from "../../config/supabaseClient";
import { useState, useEffect } from "react";
import EditCalendarItem from "./editCalendarItem";

interface ScheduleItem {
  id: number;
  date: Date;
  description: string;
  name: string;
  venue: string; // nome do lugar
  location: string, // endereço
}

const DateRow = styled.div`
display: grid;
grid-template-columns: 1fr 2fr 2fr 3fr 3fr 3fr 1fr 1fr;
grid-template-rows: 1fr;

width: 100%;
background: #00F;
justify-content: space-evenly;
`

const RowCreator = ({ id, date, name, description, venue, location }: ScheduleItem) => {
  const [openEdit, setOpenEdit] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)

  async function deleteItem(id: number) {
    const { error } = await supabase
      .from('calendar')
      .delete()
      .eq('id', id)

    if (!error) {
      setIsDeleted(true)
    }
  }

  return (
    <>
      {!isDeleted && (<> {/* precisa ficar mais claro o que esta acontecendo */}
        <DateRow>
          <p>{id}</p>
          <p>{date.toString()}</p>
          <p>{name}</p>
          <p>{description}</p>
          <p>{venue}</p>
          <p>{location}</p>
          <button onClick={() => { setOpenEdit(!openEdit) }}>Edit</button>
          <button onClick={() => { deleteItem(id) }}>Delete</button> {/* add popup for deletion */}
        </DateRow>
        {openEdit && (
          <EditCalendarItem {...{ id, date, name, description, venue, location }} setOpenEdit={setOpenEdit} />
        )}
      </>)}
      {isDeleted && (
        <p>deletado</p>
      )}
    </>
  )
}

const ListCalendarItems = () => {

  const [dates, setDates] = useState<ScheduleItem[]>([])
  const [fetchError, setFetchError] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const fetchDates = async () => {
      setLoading(true)

      const { data, error } = await supabase
        .from('calendar')
        .select() //select all

      if (error) {
        setFetchError(true)
        console.log(error)
        setDates([])
      }
      if (data) {
        setDates(data)
        setFetchError(false)
      }

      setLoading(false)
    }

    return () => {
      fetchDates()
    }
  }, [])


  return (
    <div>
      {dates &&
        dates.map((date) => (
          <RowCreator
            id={date.id}
            date={date.date}
            name={date.name}
            description={date.description}
            venue={date.venue}
            location={date.location}
          />
        ))
      }
      {loading && (<h2>Carregando...</h2>)}
    </div>
  )
}

export default ListCalendarItems;

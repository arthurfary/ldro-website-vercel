import styled from "styled-components"
import { useState, useEffect } from "react";
import supabase from "../../config/supabaseClient"

const CalendarBg = styled.div`
    background-color: red;
    min-width: 300px;
    min-height: 300px;
`

const CalendarItem = styled.div`
  display: flex;
  flex-direction: column;
   
  background-color: #fcfcfc;
  width: 100%;
  height: fit-content;
`
interface ScheduleItem {
  date: Date;
  description: string;
  name: string;
  venue: string; // nome do lugar
  location: string, // endereço
}


function Calendar() {
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
  // Function to convert a datetime object to days and months (helper function)
  const datetimeToDaysMonths = (dt: Date) => {
    return { day: dt.getDate(), month: dt.getMonth() + 1 }; // Months are 0-indexed, so add 1
  };

  const EventDetails: React.FC<{ item: ScheduleItem }> = ({ item }) => (
    <div> {/* Fragment */}
      <p>{"Data:" + item.date}</p>
      <p><b>Nome:</b> {item.name} - <b>{item.venue}</b>, {item.location}</p>
      <p><b>Descrição:</b> {item.description}</p>
    </div>
  );
  return (
    <div>
      <CalendarBg>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            {fetchError && <p>Erro ao buscar os dados.</p>}
            {!fetchError && dates.map((item) => (
              <CalendarItem>
                <EventDetails item={item} />
              </CalendarItem>
            ))}
          </>
        )}
      </CalendarBg>
    </div>
  );
}

export default Calendar;

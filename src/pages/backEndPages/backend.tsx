import ListCalendarItems from "../../components/backendComponents/listCalendarItems"
import InsertCalendarItem from "../../components/backendComponents/insertCalendarItem"

const BackendPage = () => {
  return (
    <>
      <h1>This is the BackEnd</h1> {/* here will be the config page to add new content */}
      <InsertCalendarItem />
      <ListCalendarItems />
    </>
  )
}

export default BackendPage

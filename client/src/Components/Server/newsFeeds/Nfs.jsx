import Button from 'react-bootstrap/Button';
import { Card ,Container} from 'react-bootstrap';
import "./style.css"

function Nfs({feeds}) {
  const nfeeds = ()=>(
    feeds.map((feed,ind)=>
      <>  
        <Card key={ind} style={{width:"30rem"}}>
          {feed.image ?  <Card.Img variant="top" src="" /> : null }
          <Card.Body className='card-body'>
            <Card.Title>{feed.createdBy}</Card.Title>
            <div className='d-flex align-items-center justify-content-center'>
              <Card.Text>{feed.content}</Card.Text>
              <a href={`/articles/${feed._id}`}>read more..</a>
            </div>
          </Card.Body>
        </Card>
      </>
    ) 
  )
  

  return(
    <Container className='d-flex flex-column'>
      {feeds ? nfeeds(feeds  ) : "null"}
    </Container>
  )
}

export default Nfs

// members.map((,key)=><div key={key}></div>)
import React from 'react'
import { Card} from 'react-bootstrap'

const InfoBox = ({title , cases, total}) => {
    return (
        <div>
            <Card style={{backgroundColor:'#e8e8e8'}} >
            <Card.Body style={{padding:'10px'}}>
                <Card.Title>
                    <strong>{title}</strong>
                </Card.Title>

            <Card.Text>
                <strong>{cases}</strong>
            </Card.Text>

            <Card.Text>
                <strong>{total} Total</strong>
            </Card.Text>

            </Card.Body>
            </Card>

        </div>
    )
}

export default InfoBox

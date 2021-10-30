import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import EditBtn from './buttons/EditBtn'
import DeleteBtn from './buttons/DeleteBtn'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { STATUS_WORD, STATUS_COLOR } from '../configs/status'


const TodoList = () => {
  const [item, setItem] = useState(null)
  const { todoId } = useParams()
  useEffect(async () => {
    let res = await axios.get(`http://localhost:8801/api/todos/${todoId}`)
    setItem(res.data)
  }, [])
  if (item === null) {
    return <>等待中</>
  }

  return (
    <>
      <div className="column is-three-fifths">
        <article className={`panel ${STATUS_COLOR[item.status]}`}>
          <p className="panel-heading">{STATUS_WORD[item.status]}{item.title}</p>
          <div className="card-image">
            <figure className="image is-4by3">
              <img src="#" alt="Placeholder image" />
            </figure>
          </div>
          <div className="panel-block">{item.content}</div>
          <ul>
            <li className="panel-block">{item.deadline}</li>
            <li className="panel-block">{item.created_at}</li>
            <li className="panel-block">{item.updated_at}</li>
          </ul>
          <footer className="card-footer">
            <a href="#" className="card-footer-item">
              <FontAwesomeIcon icon={faCheck} className="mr-2" />
              Done
            </a>
            <EditBtn />
            <DeleteBtn />
          </footer>
        </article>
      </div>
      <div className="column is-two-fifths">
        <article className="panel is-link">
          <p className="panel-heading">共享</p>
          <div className="field has-addons">
            <div className="control is-expanded">
              <input className="input" type="email" placeholder="輸入帳號" />
            </div>
            <div className="control">
              <a className="button is-info">新增</a>
            </div>
          </div>
        </article>
      </div>
    </>
  )
}

export default TodoList

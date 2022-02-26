import { useParams } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { useState, useEffect } from 'react'
import { projectFirestore } from '../../firebase/config'

// styles
import './Recipe.css'
import  Card  from '../../components/Card'
import Comment from '../../components/Comment'
import faker from '@faker-js/faker'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export default function Recipe() {
  const { id } = useParams()
  const { mode } = useTheme()

  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [recipe, setRecipe] = useState(null)
  const [comment, setComment] = useState(null)
  const [name, setName] = useState('')
  const [body, setBody] = useState('')
  const [created_at, setCreated_at] = useState('')

  const history = useHistory()
  console.log('id', id);
  useEffect(() => {
    setIsPending(true)

    const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot(doc => {
      if (doc.exists) {
        setIsPending(false)
        setRecipe(doc.data())
      } else {
        setIsPending(false)
        setError(`Could not find that recipe`)
      }
    })

    return () => unsub()

  }, [id])
  useEffect(() => {
    setIsPending(true)

    const sub = projectFirestore.collection('comments').where('recipe_id', '==', id).onSnapshot(snapshot => {
      console.log(snapshot);
      if (snapshot.empty) {
        // setError('No recipes to load')
        setIsPending(false)
      } else {
        let results = []
        snapshot.docs.forEach(doc => {
          // console.log(doc)
          results.push({ ...doc.data(), id: doc.id })
        })
        console.log('results', results);
        console.log(new Date(results[0].created_at.seconds * 1000).toString().slice(0, 25));
        setComment(results)
        setIsPending(false)
      }
    }, err => {
      setError(err.message)
      setIsPending(false)
    })

    return () => sub()

  }, [id])
  console.log('comment', comment);

  const handleClick = () => {
    projectFirestore.collection('recipes').doc(id).update({
      title: 'Something completely different'
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const doc = { name, body, created_at: new Date(), recipe_id: id }

    try {
      await projectFirestore.collection('comments').add(doc)
      // history.push(`{/recipes/${id}`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div className={`recipe ${mode}`}>
        {error && <p className="error">{error}</p>}
        {isPending && <p className="loading">Loading...</p>}
        {recipe && (
          <>
            <h2 className="page-title">{recipe.title}</h2>
            <p>Takes {recipe.cookingTime} to cook.</p>
            <ul>
              {recipe.ingredients.map(ing => <li key={ing}>ing</li>)}
            </ul>
            <p className="method">{recipe.method}</p>
            {/* <button onClick={handleClick}>Update me</button> */}
          </>
        )}
        {comment && <Card>
          <Comment
            comments={comment}
          />
        </Card>}
        <form className="form" onSubmit={handleSubmit}>
          <input type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required placeholder='your name'></input>
          <textarea onChange={(e) => setBody(e.target.value)}
            value={body}
            required id="text" name="body" className="form__textarea" placeholder="Add comment"></textarea>
          <button className="form__btn">Send</button>
        </form>

      </div>
    </div>
  )
}
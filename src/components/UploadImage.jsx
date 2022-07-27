import React from 'react'
import axios from 'axios';
import { useState } from 'react';

async function postImage({image}) {
const formData = new FormData();
formData.append("image", image)
const result = await axios.post('/api/users/profile/profilepic', formData, { headers: {'Content-Type': 'multipart/form-data'}})
return result.data
}

const UploadImage = () => {

  const [file, setFile] = useState()
  const [image, setImage] = useState('')

  const submit = async event => {
    event.preventDefault()
    const result = await postImage({image: file})
    setImage(result.image)
  }

  const fileSelected = event => {
    const file = event.target.files[0]
		setFile(file)
	}

  return (
    <div className="App">
      <form onSubmit={submit}>
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <button type="submit">Submit</button>
      </form>

      <img src={image} alt='profile pic'></img>

    </div>
  );
}

export default UploadImage
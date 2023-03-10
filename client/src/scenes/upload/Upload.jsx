import React from 'react'

const Upload = () => {
    const [initialValues, setInitialValues] ={
        title: '',
        description: '',
        videoUrl: '',
        thumbnail: ''
    }

    


  return (
    <div className='login'>
        <form  className="login_form">

                <div>

                    <label htmlFor="name" className='labels'>title</label>
                    <input type="text" name="title" className="name" 
                        value={initialValues.title}
                        onChange={(e)=> setInitialValues({...initialValues, title: e.target.value})}
                    />
                </div>
                <div>

                    <label htmlFor="name" className='labels'>Description </label>
                    <input type="text" name="description" className='name' 
                        value={initialValues.description}
                        onChange={(e)=> setInitialValues({...initialValues, description: e.target.value})}
                        />
                </div>
                
            <div>

            <label htmlFor="email" className='labels'>upload video</label>
            <input type="file" accept="video/*"  className='name' 
                />
            </div>
            <div>

                <label htmlFor="password" className='labels'>Password</label>
                <input type="file" accept='image/*' name="password" className='name' 
                   
                    />    
            </div>
            <button type="submit" className='btn'>upload</button>

        </form>
    </div>

  )
}

export default Upload
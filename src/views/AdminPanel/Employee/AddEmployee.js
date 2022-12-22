import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../../App';
   
const CreateCategory = ()=>{
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [name, setName] = useState();
  const [error, setError] = useState({
      status: false,
      msg: "",
      type: ""
  });
  const [file_preview, setFile_preview] = useState();

  const handleChangeFile = (event) => {
    // console.log(event.target.files);
    setFile(event.target.files[0]);
}

     const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name);
        console.log(file);

        if (name && file !== null) {
            var formdata = new FormData();
            formdata.append("name", postTitle);
            formdata.append("image", file);
            formdata.append("img_url", file.name);

            var requestOptions = {
                method: 'POST',
                //   headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(BASE_URL+"/api/employee", requestOptions)
                .then(response => response.text())
                .then(function (result) {
                    const data = JSON.parse(result);
                    console.log(data)
                    if (data.status === true) {
                        navigate('/Dashboard')
                    }
                })
                .catch(error => console.log('error', error));
        }
        else {
            setError({ status: true, msg: "All Fields are Required", type: 'error' })
        }
    }

    useEffect(() => {
      loadDatas();
      if(!file){
          setFile_preview(undefined)
          return
      }
      const file_url = URL.createObjectURL(file);
      setFile_preview(file_url);
      return() => URL.revokeObjectURL(file)
  },
  [file]
  );
    return (
        <div className="">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                {/* <h4>
                  Add employeeData
                  <Link to="/Employee" className="btn btn-primary btn-sm float-end">
                    Back
                  </Link>
                </h4> */}
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Image</label>
                      <input
                        type="file"
                        name="image[]"
                        onChange={handleChangeFile}
                        className="form-control"
                      />
                    <img rounded thumbnail src={file_preview} width={400} height={300} />

                    </div>
                    <button type="submit" className="btn btn-info btn-block">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default CreateCategory;
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import habitats from '../assets/habitats.json';

export const CreateAnimal = ({ show, onHide, token }) => {
  const [reqStatus, setReqStatus] = useState();
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState('');
  const [dataForm, setDataForm] = useState({
    name: '',
    latin_name: '',
    animal_type: '',
    habitat_id: 0,
    diet: '',
    geo_range: '',
    image_link: '',
  });

  const handleInput = (e) => {
    const { name, value } = e.target;

    setDataForm((dataForm) => {
      return {
        ...dataForm,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    const number = parseInt(dataForm.habitat_id);
    dataForm.habitat_id = number;
  }, [dataForm.habitat_id]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
    // const { image } = input;

    setDataForm((input) => {
      return {
        ...input,
        image_link: event.target.files[0].name,
      };
    });
  };

  function checkData() {
    uploadPhoto();
    createAnimal();
    // console.log(event.target.files[0]);
  }

  function createAnimal() {
    fetch(`http://localhost:3000/animals`, {
      // method: 'PATCH',
      // headers: {
      //   // boundary: 'name',
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json',
      //   Authorization: token,
      // },
      method: 'POST', // or 'PUT'
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataForm),
    })
      .then((response) => response.json())
      .then((data) => setReqStatus(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function uploadPhoto(event) {
    // event.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    console.log(file);

    fetch(`http://localhost:3000/animals/image`, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        // boundary: 'name',
        // 'content-type': 'multipart/form-data',
        Authorization: token,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => setReqStatus(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className='px-3 my-4'>
            <h6>Animal Name</h6>
            <input
              name='name'
              type='text'
              value={dataForm.name}
              className='px-5'
              onChange={handleInput}
            />
          </div>
          <div className='px-3 my-4'>
            <h6>Animal Latin Name</h6>
            <input
              name='latin_name'
              type='text'
              value={dataForm.latin_name}
              className='px-5'
              onChange={handleInput}
            />
          </div>
          <div className='px-3 my-4'>
            <h6>Animal Type</h6>
            <input
              name='animal_type'
              value={dataForm.animal_type}
              className='px-5'
              onChange={handleInput}
            />
          </div>
          <div className='px-3 my-4'>
            <h6>Animal Habitat</h6>

            <select
              name='habitat_id'
              value={dataForm.habitat_id}
              className='px-5'
              onChange={handleInput}>
              {habitats.map((habitat, index) => (
                <option key={index} value={index + 99}>
                  {habitat.name}
                </option>
              ))}
            </select>
          </div>
          <div className='px-3 my-4'>
            <h6>Animal Diet</h6>
            <input
              name='diet'
              value={dataForm.diet}
              className='px-5'
              onChange={handleInput}
            />
          </div>
          <div className='px-3 my-4'>
            <h6>Animal Geo Range</h6>
            <input
              name='geo_range'
              value={dataForm.geo_range}
              className='px-5'
              onChange={handleInput}
            />
          </div>
          <div className='px-3 my-4'>
            <h6>Animal Image</h6>

            <input
              type='file'
              name='image'
              //  value={dataForm.image_link}
              className='px-5'
              onChange={
                handleFileChange
                // handleInput();
              }
            />
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button variant='primary' onClick={checkData}>
          Save Changes
        </button>
      </Modal.Footer>
    </Modal>
  );
};

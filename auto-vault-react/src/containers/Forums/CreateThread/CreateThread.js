import React, { Component, Fragment } from 'react';
import { convertToRaw, convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { Editor } from 'react-draft-wysiwyg';
import classes from './CreateThread.module.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import thunk from 'redux-thunk';

class CreateThread extends Component {
  state = {
    description: '',
    title: '',
    category: '',
    result: '',
  };
  onDescriptionChangeHandler = (value) => {
    this.setState({ description: value });
  };

  onTitleChangeHandler = (event) => {
    this.setState({ title: event.target.value });
  };

  onCategoryChangeHandler = (event) => {
    this.setState({ category: event.target.value });
  };
  onSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const newPost = {
      title: this.state.title,
      category: this.state.category,
      description: convertToRaw(this.state.description.getCurrentContent()),
      userId: localStorage.getItem('userId'),
    };
    axios
      .post('http://localhost:5000/thread/createthread', newPost, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        console.log(res.data.createdThread.description);
        this.setState({
          result: stateToHTML(
            convertFromRaw(res.data.createdThread.description)
          ),
        });
      })

      .catch((err) => console.log('ERROR:', err));
  };

  render() {
    const uploadCallback = (file) => {
      const formData = new FormData();
      formData.append('file', file);
      return new Promise((resolve, reject) => {
        fetch('http://localhost:5000/uploadImage', {
          method: 'POST',
          body: formData,
        })
          .then((res) => res.json())
          .then((resData) => {
            console.log(resData);
            resolve({ data: { link: resData } });
          })
          .catch((error) => {
            console.log(error);
            reject(error.toString());
          });
      });
    };
    return (
      <Fragment>
        <form style={{ width: '50%', margin: 'auto' }} onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label for='exampleInputEmail1'>Thread Title</label>
            <input
              type='text'
              className='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              placeholder='Write Thread Title'
              value={this.state.title}
              onChange={this.onTitleChangeHandler}
            />
          </div>
          <div className='form-group'>
            <label for='exampleInputPassword1'>Thread Category</label>
            <select
              className='custom-select'
              value={this.state.category}
              onChange={this.onCategoryChangeHandler}
            >
              <option selected>Select Category</option>
              <option value='General Car Discussion'>
                General Car Discussion
              </option>
              <option value='Technical Forums'>Technical Forums</option>
              <option value='Buy, Sell & Exchange'>Buy, Sell & Exchange</option>
              <option value='Casual Forums'>Casual Forums</option>
            </select>
          </div>
          <div className='form-group'>
            <label for='exampleInputPassword1'>Thread Description</label>
            <Editor
              editorState={this.state.description}
              toolbarClassName='toolbarClassName'
              wrapperClassName='wrapperClassName'
              editorClassName='editorClassName'
              editorStyle={{ border: '1px solid #F1F1F1', padding: '0' }}
              onEditorStateChange={this.onDescriptionChangeHandler}
              toolbar={{ image: { uploadCallback } }}
            />
          </div>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <button type='submit' className={classes['btn-submit']}>
              Create Thread
            </button>
          </div>
        </form>
        <div dangerouslySetInnerHTML={{ __html: this.state.result }} />
      </Fragment>
    );
  }
}

export default CreateThread;

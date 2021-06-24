import React, { Component } from 'react';
import classes from './Thread.module.css';
import axios from 'axios';
import { convertToRaw, convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import qs from 'query-string';
import io from 'socket.io-client';
import { thresholdFreedmanDiaconis } from 'd3-array';
import moment from 'moment';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';

let socket;

class Thread extends Component {
  state = {
    thread: '',
    comments: '',
    month: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    text: '',
    showAlert: '',
    message: '',
  };

  componentDidMount() {
    socket = io('localhost:5000');
    const location = qs.parse(this.props.location.search);
    console.log(location.id);
    axios
      .get('http://localhost:5000/thread/getthread', {
        params: {
          id: location.id,
        },
      })
      .then((res) =>
        this.setState({ thread: res.data.thread }, () => {
          socket.emit(
            'joinThread',
            {
              name: this.props.user.name,
              room: this.state.thread._id,
            },
            (err) => {
              if (err) {
                this.setState({ message: err, showAlert: true }, () => {
                  setTimeout(() => {
                    this.setState({ showAlert: false });
                  }, 2000);
                });
              }
            }
          );
          socket.on('threadUserJoined', ({ message }) => {
            console.log(message);
            this.setState({ message: message, showAlert: true }, () => {
              setTimeout(() => {
                this.setState({ showAlert: false });
              }, 2000);
            });
          });
          socket.on(
            'updateComments',
            ({ comment }) => {
              let updateComments = [...this.state.thread.comments, comment];
              console.log(updateComments);
              this.setState({
                thread: {
                  ...this.state.thread,
                  comments: updateComments,
                },
              });
              console.log('In Update Comments');
            }
            // () => console.log(this.state.thread)
          );
        })
      )
      .catch((err) => console.log(err));
  }

  componentWillUnmount() {
    socket.disconnect();
  }
  onTextChangeHandler = (value) => {
    this.setState({ text: value });
  };

  sendMessage = () => {
    console.log('In Send Message');
    if (this.state.text) {
      socket.emit('sendMessage', {
        message: convertToRaw(this.state.text.getCurrentContent()),
        id: this.props.user._id,
        threadId: this.state.thread._id,
      });
    }
  };

  render() {
    let year, month;
    if (this.state.thread.creator?.createdAt) {
      const date = new Date(this.state.thread?.creator?.createdAt);
      year = date.getFullYear();
      month = date.getMonth() + 1;
    }

    let threadDate, threadYear, threadMonth;
    if (this.state.thread.createdAt) {
      const threadDate = new Date(this.state.thread.createdAt);
      threadYear = threadDate.getFullYear();
      threadMonth = threadDate.getMonth() + 1;
    }

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
    const content = (
      <div className={classes['thread-container']}>
        {this.state.showAlert ? (
          <div className={classes['alert-container']}>
            {' '}
            <Alert variant='info'>{this.state.message}</Alert>
          </div>
        ) : null}
        <h2>{this.state.thread.title}</h2> <div></div>
        <hr className={classes['line']}></hr>
        <div className={classes['user-details-container']}>
          <i class='fas fa-user fa-3x'></i>
          <div className={classes['user-details']}>
            <div className={classes['user-details__personal']}>
              <p style={{ color: ' #4581d3', fontWeight: 'bold' }}>
                @ {this.state.thread?.creator?.username}
              </p>
              <p>AutoWheeler</p>
            </div>
            <div className={classes['user-details__activities']}>
              <div>
                <p>
                  <i class='fas fa-book'></i> Posts: 122
                </p>
              </div>
              <div>
                <p>
                  {' '}
                  <i class='fas fa-clock'></i> Joined:{' '}
                  {this.state.thread.creator
                    ? moment
                        .utc(this.state.thread.creator.createdAt)
                        .format('MMMM YYYY')
                    : null}
                </p>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative', left: '43vw' }}>
            <p>
              {this.state.thread.createdAt
                ? moment.utc(this.state.thread.createdAt).format("MMM'YY")
                : null}
            </p>
          </div>
        </div>
        {this.state.thread.description ? (
          <div
            className={classes['comment']}
            dangerouslySetInnerHTML={{
              __html: stateToHTML(
                convertFromRaw(this.state.thread.description)
              ),
            }}
          />
        ) : null}
        {this.state.thread.comments
          ? this.state.thread.comments.map((item) => (
              <div>
                <hr className={classes['line']}></hr>
                <div className={classes['user-details-container']}>
                  <i class='fas fa-user fa-3x'></i>
                  <div className={classes['user-details']}>
                    <div className={classes['user-details__personal']}>
                      <p style={{ color: ' #4581d3', fontWeight: 'bold' }}>
                        @ {item.creator.username}
                      </p>
                      <p>AutoWheeler</p>
                    </div>
                    <div className={classes['user-details__activities']}>
                      <div>
                        <p>
                          <i class='fas fa-book'></i> Posts: 122
                        </p>
                      </div>
                      <div>
                        <p>
                          {' '}
                          <i class='fas fa-clock'></i> Joined:{' '}
                          {moment
                            .utc(item.creator.createdAt)
                            .format('MMMM YYYY')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div style={{ position: 'relative', left: '43vw' }}>
                    <p>
                      {item.createdAt
                        ? moment.utc(item.createdAt).format("MMM'YY")
                        : null}
                    </p>
                  </div>
                </div>
                <div
                  className={classes['comment']}
                  dangerouslySetInnerHTML={{
                    __html: stateToHTML(convertFromRaw(item.comment)),
                  }}
                />
              </div>
            ))
          : null}
        <div className={classes['editor-container']}>
          <Editor
            editorState={this.state.text}
            toolbarClassName='toolbarClassName'
            wrapperClassName='wrapperClassName'
            editorClassName='editorClassName'
            editorStyle={{
              border: '1px solid #F1F1F1',
              padding: '0',
            }}
            onEditorStateChange={this.onTextChangeHandler}
            toolbar={{ image: { uploadCallback } }}
          />
        </div>
      </div>
    );

    return (
      <div>
        <div className={classes['rules-container']}>
          <strong>"Respect others to earn respect"</strong>, please stay
          civilized. (You are requested, to use the search button to find
          answers to your queries / questions before posting one. It might be
          possible that your issue has already been discussed and resolved
          multiple times here)
        </div>
        <br></br>
        {content}
        <br></br>
        <button className={classes['btn-submit']} onClick={this.sendMessage}>
          Reply
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};
export default connect(mapStateToProps, null)(Thread);

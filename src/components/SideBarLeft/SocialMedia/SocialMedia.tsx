'use client'
import styles from './SocialMedia.module.css';
import { GithubIcon, LinkedInIcon, MailIcon, BeforeCopiedIcon, AfterCopiedIcon } from './SvgIcons'
import { useReducer, useEffect } from 'react'

const initialState = {
  isMessageBoxVisible: false,
  isCopied: false,
  showCopiedMessage: false,
  isFadingOut: false
};

function reducer(state, action) {
  switch (action.type) {
    case 'toggleMessageBox':
      return {
        ...state,
        isMessageBoxVisible: !state.isMessageBoxVisible,
        isCopied: false,  
        isFadingOut: state.isMessageBoxVisible
      };
    case 'copy':
      return {
        ...state,
        isCopied: true,
        showCopiedMessage: true
      };
    case 'hideMessage':
      return {
        ...state,
        showCopiedMessage: false,
        isFadingOut: true
      };
    case 'hideBox':
      return {
        ...initialState
      };
    default:
      throw new Error();
  }
}

const SocialMedia = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.showCopiedMessage) {
      const timer = setTimeout(() => {
        dispatch({ type: 'hideMessage' });
        setTimeout(() => dispatch({ type: 'hideBox' }), 500);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [state.showCopiedMessage]);

  return (
    <div className={styles.socialMedia}>
      {
        state.isMessageBoxVisible 
        && <MessageBox 
          content="chalgaro46@gmail.com" 
          state={state}
          dispatch={dispatch}
          />
      }
      <div className={styles.container}>
        <a href="https://github.com/dongkeonkim-dev">
          <GithubIcon fill="#1f2328" width="30px" height="30px" />
        </a>
      </div>
      <div>
        <a href="https://linkedin.com/in/김동건">
          <LinkedInIcon fill="#0a66c2" width="30px" height="30px" />
        </a>
      </div>
      <div>
        <input 
          type="checkbox" 
          id="mail" 
          checked={state.isMessageBoxVisible}  
          onChange={() => dispatch({ type: 'toggleMessageBox' })} 
          style={{ display: 'none' }} 
        />
        <label className={styles.label} htmlFor="mail">
          <MailIcon fill="royalblue" width="30px" height="30px" />
        </label>
      </div>
    </div>
  );
};

export default SocialMedia;

function MessageBox({ content, state, dispatch }) {

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content).then(() => {
      dispatch({ type: 'copy' });
    });
  };

  return (
    <div className={`${styles.msgbox} ${state.isFadingOut ? styles.fadeOut : ''}`}>
      
      <span className={styles.msg} data-text={content}>{content}</span>
      {state.showCopiedMessage && <div className={styles.copiedMessage}>Copied!</div>}
      <span className={styles.copybtn} onClick={copyToClipboard}>
        {state.isCopied ? (
            <AfterCopiedIcon width="16px" height="16px" fill="royalblue" />
          ) : (
            <BeforeCopiedIcon width="16px" height="16px" fill="royalblue" />
          )}
      </span>
    </div>
  );
}
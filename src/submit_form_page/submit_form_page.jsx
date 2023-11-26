import './submit-form-style.css'

export const SubmitFormPage = () => {
    return (
      <div className="submit-form-container">
          <div className="submit-form-content">
              <div className="title">Submit Form</div>
              <div className="form-container">
                  <div className="title-label">Title</div>
                  <div className="input-container">
                      <input type="text" className="input-text" placeholder="Enter the title" />
                  </div>
                  <div className="title-label">URL</div>
                  <div className="input-container">
                      <input type="text" className="input-text" placeholder="Enter the URL" />
                  </div>
                  <div className="divider">
                      <div className="divider-line"></div>
                      <div className="or">or</div>
                      <div className="divider-line"></div>
                  </div>
                  <div className="title-label">Comment</div>

                  <div className="comment-input-container">
                  <textarea className="comment-input"
                            placeholder="* Leave url blank to submit a question for discussion. If there is no url, text will appear at the top of the thread. If there is a url, text is optional."></textarea>
                  </div>
                  <div className="submit-button-container">
                      <button type="submit" className="submit-button">
                          <div className="submit-button-text">SUBMIT</div>
                      </button>
                  </div>
              </div>
          </div>

      </div>
    )
}


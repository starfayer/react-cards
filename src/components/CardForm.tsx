import React from 'react';
import { FormData, SelectValues } from 'utils/types';

interface CardFormProps {
  dataHandler: (data: FormData) => void;
}
interface CardFormState extends FormData {
  toSubmit: boolean;
  isRandom?: boolean;
}
const defaultCardState: CardFormState = {
  authorLink: undefined,
  authorNickname: undefined,
  imageLink: undefined,
  isRandom: undefined,
  toSubmit: false,
};

class CardForm extends React.Component<CardFormProps> {
  _handlers: {
    inputChange: (e: React.FormEvent<HTMLInputElement>) => void;
    selectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    submit: (e: React.FormEvent<HTMLFormElement>) => void;
  };
  _outgoingData: FormData;
  _formRef: React.RefObject<HTMLFormElement>;

  constructor(props: CardFormProps) {
    super(props);
    this._outgoingData = {
      authorLink: '',
    };
    this._formRef = React.createRef();

    this.state = defaultCardState;
    this._handlers = {
      selectChange: this._onSelectChange.bind(this),
      inputChange: this._onInputChange.bind(this),
      submit: this._onSubmit.bind(this),
    };
  }
  state: CardFormState;

  _onSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.currentTarget.value;
    switch (value) {
      case SelectValues.particular:
        this.setState({ isRandom: false });
        break;
      case SelectValues.random:
        this.setState({ isRandom: true });
        break;
    }
  }
  _onInputChange(e: React.FormEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    const id = e.currentTarget.id as keyof FormData;
    this._outgoingData[id] = value;

    if (this._formRef.current!.checkValidity()) {
      this.setState({ toSubmit: true });
    }
  }
  _onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    this.props.dataHandler(this._outgoingData);
    this.setState(defaultCardState);
  }
  render() {
    let dataForm = null;
    if (this.state.isRandom) {
      dataForm = (
        <>
          <div className="card-title">Author info</div>
          <div className="form-floating mb-3">
            <input
              type="url"
              className="form-control"
              id="authorLink"
              placeholder="Unsplash profile link"
              onChange={this._handlers.inputChange}
              value={this.state.authorLink}
              required
            />
            <label htmlFor="authorLink">Unsplash profile link</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="authorNickname"
              placeholder="Custom nickname"
              onChange={this._handlers.inputChange}
              value={this.state.authorNickname}
            />
            <label htmlFor="authorNickname">Custom nickname</label>
          </div>
        </>
      );
    } else if (this.state.isRandom === false) {
      dataForm = (
        <>
          <div className="card-title">Image info</div>
          <div className="form-floating mb-3">
            <input
              type="url"
              className="form-control"
              id="imageLink"
              placeholder="Unsplash page link"
              onChange={this._handlers.inputChange}
              value={this.state.imageLink}
              required
            />
            <label htmlFor="floatingInput">Unsplash page link</label>
          </div>
        </>
      );
    }

    return (
      <div className="card card-custom rounded" style={{ width: '80%', height: '400px' }}>
        <div className="card-header">Enter your card data and type here:</div>
        <div className="card-body row align-items-center">
          <form ref={this._formRef} onSubmit={this._handlers.submit} noValidate>
            <div className="card-title">Card type</div>
            <select
              className="form-select form-select-lg mb-3"
              id="cardType"
              onChange={this._handlers.selectChange}
            >
              <option selected={!this.state.toSubmit}>Choose card type</option>
              <option value={SelectValues.random}>Random</option>
              <option value={SelectValues.particular}>Particular</option>
            </select>
            {dataForm}
            <button className="btn btn-primary" type="submit" disabled={!this.state.toSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export { CardForm };

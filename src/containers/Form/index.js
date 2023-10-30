import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Field, { FIELD_TYPES } from '../../components/Field';
import Select from '../../components/Select';
import Button, { BUTTON_TYPES } from '../../components/Button';

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 500); // Reducing from 1000 to 500 to speed up the test, making it possible to find "Message sent!" more quickly.
  });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        // Calling the onSuccess function to display the confirmation message.
        onSuccess(); // in the case of a success
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );
  return (
    <form onSubmit={sendContact}>
      <div className='row'>
        <div className='col'>
          <Field placeholder='' label='Nom' />
          <Field placeholder='' label='Prénom' />
          <Select
            selection={['Personnel', 'Entreprise']} // Here spell error personel instead of personnel
            onChange={() => null}
            label='Personnel / Entreprise' // here also the same spell error
            type='large'
            titleEmpty
          />
          <Field placeholder='' label='Email' />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? 'En cours' : 'Envoyer'}
          </Button>
        </div>
        <div className='col'>
          <Field
            placeholder='message'
            label='Message'
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;

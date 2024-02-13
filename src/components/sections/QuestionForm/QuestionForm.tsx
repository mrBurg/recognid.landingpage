import React, { useCallback, useState } from 'react';
import _ from 'lodash';
import Image from 'next/image';
import { toJS } from 'mobx';

import { WithDangerousHTML } from '@src/hocs/WithDangerousHTML';
import { ButtonWidget } from '@src/widgets/ButtonWidget';

import { commonApi } from '@src/api';
import { checkStatus } from '@src/api/apiUtils';
import { TextFiledComponent } from '@components/TextFiledComponent';
import { CheckBoxComponent } from '@components/CheckBoxComponent';
import { InputComponent } from '@components/InputComponent';

import { smoothScroll } from '@src/utils/smoothScroll';

import { TQuestionForm } from './@types';
import styles from './QuestionForm.module.scss';

export function QuestionForm(props: TQuestionForm) {
  const initialState = {
    firstName: { value: '', id: 'firstName' },
    workEmail: { value: '', id: 'workEmail' },
    lastName: { value: '', id: 'lastName' },
    companyName: { value: '', id: 'companyName' },
    request: { value: '', id: 'request' },
    checkBox: { value: false, id: 'checkBox' },
  };

  const [formState, setFormState] = useState(initialState);

  const [invalidFields, setInvalidFields] = useState<Array<string | boolean>>(
    []
  );
  const [showSentForm, setShowSentForm] = useState(false);
  const setCurrentValue = (currentValue: string | boolean, id: string) => {
    setFormState({ ...formState, [id]: { value: currentValue, id: id } });
  };

  const [validForm, setValidForm] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const validateForm = () => {
    let invalidFieldsInner: (string | boolean)[] = invalidFields;

    _.forEach(formState, (item) => {
      invalidFieldsInner = validateItem(
        item.value,
        item.id,
        invalidFieldsInner
      ) as (string | boolean)[];
    });

    setInvalidFields(invalidFieldsInner);

    if (invalidFieldsInner.length == 0) {
      return true;
    }

    return false;
  };

  const validateItem = useCallback(
    (
      currentValue: string | boolean,
      id: string,
      invalidFieldsInner?: (string | boolean)[]
    ) => {
      /*Check if field contain in invalidFields */
      const containedField = () => {
        if (id != invalidFields.filter((item) => item == id)[0]) {
          if (invalidFieldsInner) {
            return (invalidFieldsInner = [...invalidFieldsInner, id]);
          }
          return setInvalidFields([...invalidFields, id]);
        }
      };

      if (id == 'request') {
        if (invalidFieldsInner) {
          return invalidFieldsInner;
        }

        return;
      }

      //Validate checkBox
      if (id == 'checkBox' && !formState.checkBox.value) {
        containedField();
        if (invalidFieldsInner) {
          return invalidFieldsInner;
        }

        return;
      }

      //Validate email
      if (id == 'workEmail' && typeof currentValue === 'string') {
        const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegEx.test(currentValue)) {
          containedField();
          if (invalidFieldsInner) {
            return invalidFieldsInner;
          }
          return;
        }
      }

      //Validate all other items
      if (typeof currentValue === 'string' && currentValue.length < 1) {
        containedField();
        if (invalidFieldsInner) {
          return invalidFieldsInner;
        }

        return;
      }

      const removedInvalidFields = invalidFields.filter((item) => item != id);

      if (invalidFieldsInner) {
        return (invalidFieldsInner = removedInvalidFields);
      }
      setInvalidFields(removedInvalidFields);
    },
    [formState.checkBox.value, invalidFields]
  );

  const submitForm = async () => {
    /* const formDataFile = {
      dateTime: moment().format('YYYY-MM-DDTHH:mm:ss'),
      firstName: formState.firstName.value,
      lastName: formState.lastName.value,
      workEmail: formState.workEmail.value,
      companyName: formState.companyName.value,
      request: formState.request.value,
      checkBox: formState.checkBox.value,
    }; */

    const formData = {
      workEmail: formState.workEmail.value,
      firstName: formState.firstName.value,
      lastName: formState.lastName.value,
      companyName: formState.companyName.value,
      request: formState.request.value,
    };

    try {
      setIsDisabled(true);
      //const response = await axios.post('/api', formDataFile);  //write to file
      const response = await commonApi.sendQuestionForm(formData);

      if (response && checkStatus(response)) {
        setValidForm(true);
        setFormState(initialState);
      } else {
        setValidForm(false);
      }
      setIsDisabled(false);
      setShowSentForm(true);
    } catch (error) {
      console.log('~ Error:', toJS(error));
      setValidForm(false);
      setShowSentForm(true);
      setIsDisabled(false);
    }
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!!validateForm()) {
      submitForm();
    }
  };

  const closeSentForm = () => {
    setShowSentForm(false);
    if (validForm) {
      smoothScroll('', 'header');
    }
  };

  return (
    <div className={styles.questionFormWrap}>
      <div id={'form'} className={styles.container}>
        <div className={styles.questionInnerWrap}>
          {!showSentForm && (
            <>
              <WithDangerousHTML>
                <h2 className={styles.title}>{props.title}</h2>
              </WithDangerousHTML>
              <span className={styles.subtitle}>{props.subtitle}</span>
              <form
                className={styles.form}
                onSubmit={(event) => onSubmitHandler(event)}
              >
                <div className={styles.inputsBlock}>
                  <div className={styles.inputsSection}>
                    <InputComponent
                      placeholder={props.firstName.placeholder}
                      value={formState.firstName.value}
                      error={invalidFields.includes('firstName')}
                      callBack={(event) =>
                        setCurrentValue(event.target.value, 'firstName')
                      }
                      id={'firstName'}
                      className={styles.input}
                      onBlur={(event) =>
                        validateItem(event.target.value, 'firstName')
                      }
                    />
                    <InputComponent
                      placeholder={props.lastName.placeholder}
                      value={formState.lastName.value}
                      error={invalidFields.includes('lastName')}
                      callBack={(event) =>
                        setCurrentValue(event.target.value, 'lastName')
                      }
                      id={'lastName'}
                      className={styles.input}
                      onBlur={(event) =>
                        validateItem(event.target.value, 'lastName')
                      }
                    />
                  </div>
                  <div className={styles.inputsSection}>
                    <InputComponent
                      placeholder={props.workEmail.placeholder}
                      value={formState.workEmail.value}
                      error={invalidFields.includes('workEmail')}
                      errorMessage={props.invalidWorkEmailMessage}
                      callBack={(event) =>
                        setCurrentValue(event.target.value, 'workEmail')
                      }
                      id={'workEmail'}
                      className={styles.input}
                      onBlur={(event) =>
                        validateItem(event.target.value, 'workEmail')
                      }
                    />
                    <InputComponent
                      placeholder={props.companyName.placeholder}
                      value={formState.companyName.value}
                      error={invalidFields.includes('companyName')}
                      callBack={(event) =>
                        setCurrentValue(event.target.value, 'companyName')
                      }
                      id={'companyName'}
                      className={styles.input}
                      onBlur={(event) =>
                        validateItem(event.target.value, 'companyName')
                      }
                    />
                  </div>
                </div>
                <div className={styles.inputsBlock}>
                  <TextFiledComponent
                    placeholder={props.request.placeholder}
                    value={formState.request.value}
                    error={invalidFields.includes('request')}
                    callBack={(event) =>
                      setCurrentValue(event.target.value, 'request')
                    }
                    id={'request'}
                    className={styles.textField}
                  />
                  <div className={styles.submitForm}>
                    <CheckBoxComponent
                      required
                      text={props.policyCheckboxText}
                      invalid={false}
                      checked={formState.checkBox.value}
                      callBack={(event) =>
                        setCurrentValue(event.target.checked, 'checkBox')
                      }
                      onBlur={(event) =>
                        validateItem(event.target.value, 'checkBox')
                      }
                      error={invalidFields.includes('checkBox')}
                      errorText={props.invalidPolicyCheckboxMessage}
                    />
                    <ButtonWidget
                      className={styles.buttonComponent}
                      title={'Submit'}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
              </form>
            </>
          )}
          {showSentForm && (
            <>
              <h2 className={styles.sentFormTitle}>
                {validForm ? props.validFormMessage : props.invalidFormMessage}
              </h2>
              <span className={styles.message}>
                {validForm
                  ? props.validFormDescription
                  : props.invalidFormDescription}
              </span>
              <div className={styles.submitImageWrap}>
                <div
                  className={styles.submitImage}
                  style={{
                    backgroundImage: `url('${
                      validForm
                        ? '/images/form/submit.webp'
                        : '/images/form/error.webp'
                    }')`,
                  }}
                />
              </div>

              <ButtonWidget
                callBack={() => closeSentForm()}
                className={styles.buttonWidget}
                title={
                  validForm ? props.validButtonText : props.invalidButtonText
                }
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

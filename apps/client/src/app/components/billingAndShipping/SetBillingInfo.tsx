import { useState } from 'react';

import userStore from '@/app/store/userStore';

import Dropdown from '../common/Dropdown';
import LabelInput from '../common/LabelInput';
import { Bolivia, countryList, USA } from './extraComponents/Lists';

type Props = {
  onClose: () => void;
};

function SetBillingInfo({ onClose }: Props) {
  const buttonStyle = 'font-ropa bg-none text-2xl underline';
  const [selectedCountry, setSelectedCountry] = useState('');
  const { user, setUser } = userStore.getState();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [streetAddress, setStreetAddress] = useState(user.streetAddress);
  const [building, setBuilding] = useState(user.building);
  const [zipCode, setZipCode] = useState(user.zipCode);
  const [city, setCity] = useState(user.city);
  const [country, setCountry] = useState(user.country);
  const [streetBuilding, setStreetBuilding] = useState(
    `${user.streetAddress} , ${user.building}`
  );
  const [errorMessage, setErrorMessage] = useState('');

  function handleAddress(address: string) {
    const [left, right] = address.split(',');
    setStreetBuilding(address);

    setStreetAddress(left.trim());
    setBuilding(right.trim());
  }

  function validateData() {
    const regexName = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
    const regexZip = /^\d{5}$/;
    const regexAddress = /^^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*\s,\s\d{4}$/;

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !streetAddress.trim() ||
      !firstName.trim() ||
      !zipCode.trim()
    ) {
      setErrorMessage('Do not leave blank fields');
      return false;
    }

    if (!regexName.test(firstName)) {
      setErrorMessage('Name must contain only letters and spaces between them');
      return false;
    }
    if (!regexName.test(lastName)) {
      setErrorMessage('LastName must contain only letters and spaces');
      return false;
    }
    if (!regexZip.test(zipCode)) {
      setErrorMessage('Zip code must contain 5 numbers');
      return false;
    }

    if (!regexAddress.test(streetBuilding)) {
      setErrorMessage(
        `Street Address format: 'Street name , 4numbers(building)'`
      );
      return false;
    }

    return true;
  }
  const handleUpdate = async () => {
    if (validateData()) {
      await fetch(`/api/user/${user.userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          streetAddress,
          building,
          zipCode,
          city,
          country,
        }),
      });
      userStore.setState(prevState => {
        const updatedUser = {
          ...prevState.user,
          firstName,
          lastName,
          streetAddress,
          building,
          zipCode,
          city,
          country,
        };

        setUser(updatedUser);
        onClose();

        return prevState;
      });
    }
  };

  return (
    <div className='fixed h-full z-10 w-full bg-black/20 flex items-center justify-center'>
      <form className='flex-col justify-center bg-[#DED9E1] p-5 h-max w-1/4'>
        <span className='text-3xl'>Enter your name and Address:</span>
        <div className='flex-col mt-5'>
          <LabelInput
            inputText={firstName}
            onChange={value => setFirstName(value)}
            maxLength={25}
          >
            Name(s)
          </LabelInput>
          <LabelInput
            inputText={lastName}
            onChange={value => setLastName(value)}
            maxLength={25}
          >
            Last Name(s)
          </LabelInput>
          <LabelInput
            inputText={streetBuilding}
            onChange={value => handleAddress(value)}
            maxLength={50}
          >
            Street Address (Street, Building number)
          </LabelInput>
        </div>

        <div className='flex justify-between'>
          <LabelInput
            inputText={zipCode}
            onChange={value => setZipCode(value)}
            className='mr-3'
            maxLength={5}
          >
            Zip code
          </LabelInput>
          <Dropdown
            defaultItem={city}
            items={selectedCountry === 'Bolivia' ? Bolivia : USA}
            onSelect={selectedItem => setCity(selectedItem)}
          >
            States
          </Dropdown>
        </div>

        <Dropdown
          items={countryList}
          defaultItem={country}
          onSelect={selectedItem => {
            setSelectedCountry(selectedItem);
            setCountry(selectedItem);
          }}
        >
          Country
        </Dropdown>
        <p className='flex justify-center w-full'>{errorMessage}&nbsp;</p>
        <div className='flex justify-between mt-11'>
          <button type='button' className={buttonStyle} onClick={onClose}>
            Cancel
          </button>
          <button type='button' onClick={handleUpdate} className={buttonStyle}>
            Accept
          </button>
        </div>
      </form>
    </div>
  );
}

export default SetBillingInfo;

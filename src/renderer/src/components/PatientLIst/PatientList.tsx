import { useDispatch, useSelector } from 'react-redux';
import { PatientFormData, PatientListType } from '@renderer/models/interfaces';
import MaterialInput from '../shared/MaterialInput';
import { useEffect, useState } from 'react';
import { removePatient, addBulkPatients } from '../../store/patientSlice';
import { useNavigate } from 'react-router-dom';


function PatientList() {
  const patientList = useSelector(
    (state: PatientListType) => state.patientList
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ filteredList, updateFilteredList ] = useState<PatientFormData[]>([]);
  const [ search, setSearch ]                = useState('');

  useEffect(() => {
    updateFilteredList(() => patientList)
  }, [ patientList ])

  const onSearch = () => {
    let filtered = patientList.filter( patient => 
                      patient.email.includes(search) ||
                      patient.firstName.includes(search) ||
                      patient.lastName.includes(search) ||
                      patient.phone.includes(search)
                  );

    updateFilteredList(() => filtered)
  }

  const resetSearch = () => {
    setSearch('');
    updateFilteredList(() => patientList.map(patient => patient))
  }

  const handleEdit = (patient) => {
    navigate(`patients-input/${ patient.id }`);
  }

  const savePatientsInfo = () => {
    window.api.savePatients(patientList)
  }

  const uploadPatientList = () => {
    window.api.uploadPatients().then(patients => {
      dispatch( addBulkPatients(patients) );
    });
  }

  return (
    <div className=' flex flex-col w-full min-w-[50vw] min-h-[60vh] max-h-[70vh] border-2 p-5'>
      
      <div className='flex gap-1.5 items-center justify-center'>
        <div className='flex justify-center items-center w-[90%] relative'>
          <MaterialInput
            id='search'
            label='Search on phone, email, name...'
            placeholder='Search on phone, email, name...'
            value={search}
            onChange={ (e) => setSearch(e.target.value) }
          ></MaterialInput>
          <button className='mr-[-10px] absolute right-5 cursor-pointer' onClick={ resetSearch }>X</button>
        </div>
        <button className='bg-blue-600 py-0 px-1 rounded-[5px] cursor-pointer h-10 text-sm font-medium text-white' onClick={ onSearch }>Search</button>
      </div>

      <div className='flex flex-col min-h-0 flex-1 mt-9 w-full overflow-y-auto'>
        {
          <>
            <div className='flex gap-2 justify-end'>
              <p className='text-amber-300 text-end cursor-pointer' onClick={ savePatientsInfo }>Save to File</p>
              <p className='text-blue-500 text-end cursor-pointer' onClick={ uploadPatientList }>Upload Data</p>
            </div>
           
            <div className='flex w-full mt-2 border-t border-b mb-3 sticky top-0 bg-[#1a1a1a]'>
              <span className='w-[25%]'>Name</span>
              <span className='w-[30%]'>Email</span>
              <span className='w-[25%]'>Phone</span>
            </div>
            {filteredList && filteredList.length > 0 && filteredList.map((patient) => (
              <div className={`w-full flex mt-1.5`} key={patient.id}>
                <span className='w-[25%]'>{patient.firstName} {patient.lastName}</span>
                <span className='w-[30%]'>{patient.email}</span>
                <span className='w-[25%]'>{patient.phone}</span>
                <span className='w-[20%] flex gap-2'>
                  <button
                    className='flex items-center cursor-pointer bg-blue-600 px-2 rounded-[5px] h-7.5 text-sm font-medium text-white'
                    onClick={() => handleEdit(patient)}>
                    Edit
                  </button>
                  <button
                    className='flex items-center cursor-pointer bg-red-500 px-2 rounded-[5px] h-7.5 text-sm font-medium text-white'
                    onClick={() => dispatch(removePatient(patient.id))}>
                    Delete
                  </button>
                </span>
              </div>
            ))}
          </>
        }

        { (!filteredList || filteredList.length === 0) ? <p className='font-bold text-[20px] text-center w-full flex align-middle justify-center mt-4'> No Patients to show </p> : null }
      </div>
      
    </div>
  )
}

export default PatientList

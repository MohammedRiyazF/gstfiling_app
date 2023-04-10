import { gql, useMutation } from '@apollo/client';
import React from 'react'
import bcrypt from 'bcryptjs-react'
import LoadingIcon from '../../../components/loadingIcon';
import { useNavigate } from 'react-router-dom';

const INSERT_FIRM = gql`mutation InsertCompositionDealers($isVerified: Boolean, $Category: Int, $Financial_Year: Int, $Address: String, $GSTIN: String, $Legal_Name: String, $Place: String, $Trade_Name: String, $Username: String!, $Password: String!) {
    insert_composition_dealers(objects: {
      GSTIN: $GSTIN, 
      Legal_Name: $Legal_Name, 
      Trade_Name: $Trade_Name, 
      Address: $Address, 
      Category: $Category, 
      Financial_Year: $Financial_Year, 
      isVerified: $isVerified, 
      Place: $Place,
      Username : $Username,
      Password : $Password
    }) {
      affected_rows
    }
  }
  `

const INSERT_RETURN_FILED_STATUS = gql`mutation insertReturnFiledStatus($GSTIN: String!, $legal_name: String!, $financial_year: Int!, $quarter: Int! ) {
    insert_returns_filed_status(objects: {GSTIN: $GSTIN, legal_name: $legal_name, financial_year: $financial_year, quarter: $quarter, filed_or_not: false}) {
      affected_rows
    }
  }
   `

const Gstcmp02form = () => {
    var type;
    const navigate = useNavigate()
    const [insertFirm, { loading, data, error }] = useMutation(INSERT_FIRM, {
        onCompleted(data) {
            alert("Successfully Registered !")
        },
        onError(err) {
            alert(err.toString())
        }
    })

    const [insertReturnFiledStatus, { loading: Loading, data: returnFiledData, error: ErrorReturnFiled }] = useMutation(INSERT_RETURN_FILED_STATUS, {
        onError(err) {
            alert(err.toString())
        }
    })

    const handleChange = (event) => {
        type = event.target.value
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        var gstin = document.getElementById('gstin').value
        var legalname = document.getElementById('legalname').value
        var tradename = document.getElementById('tradename').value
        var address = document.getElementById('address').value
        var financialYear = document.getElementById('financial_year').value
        var category = type
        var isDeclared = document.getElementById('declaration').value
        var isVerified = document.getElementById('verification').value
        var isSigned = document.getElementById('signature').value
        var allVerified = isDeclared && isVerified && isSigned ? true : false
        var username = document.getElementById("user_name").value
        var place = document.getElementById('place').value
        var password = document.getElementById("password").value
        var confirmPassword = document.getElementById("confirm_password").value
        if (username && (password === confirmPassword)) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
        } else if (password !== confirmPassword) {
            alert('Password Mismatch!')
        }

        insertFirm({
            variables: {
                GSTIN: gstin,
                Legal_Name: legalname,
                Trade_Name: tradename,
                Address: address,
                Category: category,
                Financial_Year: financialYear,
                isVerified: allVerified,
                Place: place,
                Username: username,
                Password: hash
            }
        })
        for (let quarter = 1; quarter <= 4; quarter++) {
            insertReturnFiledStatus({
                variables: {
                    GSTIN: gstin,
                    legal_name: legalname,
                    financial_year: financialYear,
                    quarter: quarter,
                }
            })
        }
        navigate('/login')
    }

    return (
        <div className='flex flex-col bg-white h-[86%] p-2'>
            {loading || Loading ?
                <LoadingIcon title="Submitting" /> :
                <>
                    <div>
                        <h2 className='text-center'>Application for opting <b>GST Composition Scheme</b></h2>
                        <p className='text-center'>Please fill out the details below to proceed!</p>
                    </div>
                    <div className='my-5 mx-7'>
                        <form className='grid gap-5' onSubmit={handleSubmit}>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                                <label className='w-1/4'>GSTIN</label>
                                <input id="gstin" type='text' className='w-auto p-2 border-2 rounded-md outline-none' required pattern='\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}' />
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                                <label className='w-1/4'>Legal Name of Business</label>
                                <input id="legalname" type='text' className='col-auto p-2 border-2 rounded-md outline-none' required />
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                                <label className='w-1/4'>Trade name, if any</label>
                                <input id="tradename" type='text' className='col-auto p-2 border-2 rounded-md outline-none' />
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                                <label className='w-1/4'>Address of Principal Place of Business</label>
                                <input id="address" type='text' className='col-auto p-2 border-2 rounded-md outline-none' required />
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                                <label className='w-1/4'>Financial Year</label>
                                <input id="financial_year" type='text' className='col-auto p-2 border-2 rounded-md outline-none' required />
                            </div>
                            <hr />
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                                <label className='w-1/4'>User Name</label>
                                <input id="user_name" type='text' className='col-auto p-2 border-2 rounded-md outline-none' required />
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                                <label className='w-1/4'>Password</label>
                                <input id="password" type='password' className='col-auto p-2 border-2 rounded-md outline-none' required />
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                                <label className='w-1/4'>Confirm New Password</label>
                                <input id="confirm_password" type='password' className='col-auto p-2 border-2 rounded-md outline-none' required />
                            </div>
                            <section>
                                <div className='bg-gray-300 p-2 '>
                                    Category of Registered Person :
                                </div>
                                <div className='grid m-2' onChange={handleChange} >
                                    <label>
                                        <input type="radio" name="category" value={1} required />Manufacturers,
                                        other than Manufacturers of notified goods for which option is not available</label>
                                    <br />
                                    <label>
                                        <input type="radio" name="category" value={2} />Suppliers, making
                                        supplies referred to in clause(b) of paragraph 6 of Schedule II</label>
                                    <br />
                                    <label>
                                        <input type="radio" name="category" value={3} />Any other supplier
                                        eligible for composition levy</label>
                                </div>
                                <div className='bg-gray-300 p-2'>
                                    Composition Declaration *:
                                </div>
                                <div className="py-2">
                                    <label>
                                        <input id="declaration" type="checkbox" name="category" required /> I hereby declare that the aforesaid business shall abide
                                        by the conditions and restrictions specified for paying tax under section 10.
                                    </label>
                                </div>
                                <div className='bg-gray-300 p-2'>
                                    Verification:
                                </div>
                                <div className="py-2">
                                    <label>
                                        <input id="verification" type="checkbox" name="category" required /> I hereby solemnly affirm and declare that the information
                                        declared herein above is true to the best of my knowledge.
                                    </label>
                                </div>
                            </section>
                            <section className="grid grid-cols-1 sm:grid-cols-2">
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-center'>
                                    <label>Name of Authorized Signatory</label>
                                    <input id="signature" type='text' className=" p-2 border-2 rounded-md outline-none" required />
                                </div>
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-center'>
                                    <label>Place</label>
                                    <input id="place" type='text' className=" p-2 border-2 rounded-md outline-none" required />
                                </div>
                            </section>
                            <section className='flex justify-end'>
                                <input type='submit' className='bg-blue-600 text-white py-2 px-4 rounded' />
                            </section>
                        </form>
                    </div>
                </>}
        </div>
    )
}

export default Gstcmp02form
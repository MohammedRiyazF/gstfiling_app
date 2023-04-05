import { gql, useMutation } from '@apollo/client';
import React from 'react'
import bcrypt from 'bcryptjs-react'

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

const INSERT_RETURN_FILED = gql`mutation Insert_Return_Filed($GSTIN: String!, $Legal_Name: String!, $Financial_Year: String!, $Quarter: String!, $Filed_or_Not: Boolean!) {
    insert_return_filed(objects: {GSTIN: $GSTIN, Legal_Name: $Legal_Name, Financial_Year: $Financial_Year, Quarter: $Quarter, Filed_or_Not: $Filed_or_Not}) {
      affected_rows
    }
  }
  `

const Gstcmp02form = () => {
    var type;
    const [insertFirm, { loading, data, error }] = useMutation(INSERT_FIRM, {
        onCompleted(data) {
            alert("Successfully Registered !")
        },
        onError(err) {
            alert(err.toString())
        }
    })

    const [insertReturnFiled, { loading: Loading, data: returnFiledData, error: ErrorReturnFiled }] = useMutation(INSERT_RETURN_FILED, {
        onError(err) {
            alert(err.toString())
        }
    })

    if (loading || Loading) return <div className='bg-white flex justify-center items-center'>Submitting...</div>

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

        insertReturnFiled({
            variables: {
                GSTIN: gstin,
                Legal_Name: legalname,
                Financial_Year: financialYear,
                Quarter: '',
                Filed_or_Not: false
            }
        })
    }

    return (
        <div className='flex flex-col bg-white h-auto p-2'>
            <div>
                <h2 className='text-center'>Application for opting <b>GST Composition Scheme</b></h2>
                <p className='text-center'>Please fill out the details below to proceed!</p>
            </div>
            <div className='my-5 mx-7'>
                <form className='grid gap-5' onSubmit={handleSubmit}>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                        <label className='w-1/4'>GSTIN</label>
                        <input id="gstin" type='text' className='w-auto p-2 border-2 rounded-md outline-none' />
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                        <label className='w-1/4'>Legal Name of Business</label>
                        <input id="legalname" type='text' className='col-auto p-2 border-2 rounded-md outline-none' />
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                        <label className='w-1/4'>Trade name, if any</label>
                        <input id="tradename" type='text' className='col-auto p-2 border-2 rounded-md outline-none' />
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                        <label className='w-1/4'>Address of Principal Place of Business</label>
                        <input id="address" type='text' className='col-auto p-2 border-2 rounded-md outline-none' />
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                        <label className='w-1/4'>Financial Year</label>
                        <input id="financial_year" type='text' className='col-auto p-2 border-2 rounded-md outline-none' />
                    </div>
                    <hr />
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                        <label className='w-1/4'>User Name</label>
                        <input id="user_name" type='text' className='col-auto p-2 border-2 rounded-md outline-none' />
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                        <label className='w-1/4'>Password</label>
                        <input id="password" type='password' className='col-auto p-2 border-2 rounded-md outline-none' />
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                        <label className='w-1/4'>Confirm New Password</label>
                        <input id="confirm_password" type='password' className='col-auto p-2 border-2 rounded-md outline-none' />
                    </div>
                    <section>
                        <div className='bg-gray-300 p-2 '>
                            Category of Registered Person :
                        </div>
                        <div className='grid m-2' onChange={handleChange}>
                            <label>
                                <input type="radio" name="category" value={1} />Manufacturers,
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
                                <input id="declaration" type="checkbox" name="category" /> I hereby declare that the aforesaid business shall abide
                                by the conditions and restrictions specified for paying tax under section 10.
                            </label>
                        </div>
                        <div className='bg-gray-300 p-2'>
                            Verification:
                        </div>
                        <div className="py-2">
                            <label>
                                <input id="verification" type="checkbox" name="category" /> I hereby solemnly affirm and declare that the information
                                declared herein above is true to the best of my knowledge.
                            </label>
                        </div>
                    </section>
                    <section className="grid grid-cols-1 sm:grid-cols-2">
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-center'>
                            <label>Name of Authorized Signatory</label>
                            <input id="signature" type='text' className=" p-2 border-2 rounded-md outline-none" />
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-center'>
                            <label>Place</label>
                            <input id="place" type='text' className=" p-2 border-2 rounded-md outline-none" />
                        </div>
                    </section>
                    <section className='flex justify-end'>
                        <input type='submit' className='bg-blue-600 text-white py-2 px-4 rounded' />
                    </section>
                </form>
            </div>
        </div>
    )
}

export default Gstcmp02form
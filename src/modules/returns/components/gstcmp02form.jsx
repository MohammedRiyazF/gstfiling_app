import React from 'react'

const Gstcmp02form = () => {
    return (
        <div className='flex flex-col bg-white w-full h-[85vh] p-2'>
            <div>
                <h2 className='text-center'>Application for opting <b>GST Composition Scheme</b></h2>
                <p className='text-center'>Please fill out the details below to proceed!</p>
            </div>
            <div className='my-5 mx-7'>
                <form className='grid gap-5'>
                    <div className='flex items-center justify-between gap-5'>
                        <label className='w-1/4'>GSTIN</label>
                        <input type='text' className='flex-1 p-2 border-2 rounded-md outline-none' />
                    </div>
                    <div className='flex items-center justify-between gap-5'>
                        <label className='w-1/4'>Legal Name of Business</label>
                        <input type='text' className='flex-1 p-2 border-2 rounded-md outline-none' />
                    </div>
                    <div className='flex items-center justify-between gap-5'>
                        <label className='w-1/4'>Trade name, if any</label>
                        <input type='text' className='flex-1 p-2 border-2 rounded-md outline-none' />
                    </div>
                    <div className='flex items-center justify-between gap-5'>
                        <label className='w-1/4'>Address of Principal Place of Business</label>
                        <input type='text' className='flex-1 p-2 border-2 rounded-md outline-none' />
                    </div>
                    <div className='flex items-center justify-between gap-5'>
                        <label className='w-1/4'>Financial Year</label>
                        <input type='text' className='flex-1 p-2 border-2 rounded-md outline-none' disabled />
                    </div>
                    <section>
                        <div className='bg-gray-300 p-2'>
                            Category of Registered Person :
                        </div>
                        <div className='grid m-2'>
                            <label>
                                <input type="radio" name="category" />Manufacturers,
                                 other than Manufacturers of notified goods for which option is not available</label>
                                 <br/>
                            <label>
                                <input type="radio" name="category" />Suppliers, making
                                supplies referred to in clause(b) of paragraph 6 of Schedule II</label>
                                <br/>
                            <label>
                                <input type="radio" name="category" />Any other supplier 
                                eligible for composition levy</label>
                        </div>
                        <div className='bg-gray-300 p-2'>
                            Composition Declaration *:
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" name="category" /> I hereby declare that the aforesaid business shall abide
                                by the conditions and restrictions specified for paying tax under section 10.
                            </label>
                        </div>
                        <div className='bg-gray-300 p-2'>
                            Verification:
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" name="category" /> I hereby solemnly affirm and declare that the information 
                                declared herein above is true to the best of my knowledge.
                            </label>
                        </div>
                    </section>
                    <section className="flex justify-around items-center"> 
                        <div className='flex items-center gap-2'>
                            <label>Name of Authorized Signatory</label>
                            <input type='text' className=" p-2 border-2 rounded-md outline-none"/>
                        </div>
                        <div className='flex items-center gap-2'>
                            <label>Place</label>
                            <input type='text' className=" p-2 border-2 rounded-md outline-none"/>
                        </div>
                    </section>
                    <section className='flex justify-end'>
                        <input type='submit' className='bg-blue-600 text-white py-2 px-4 rounded'/>
                    </section>
                </form>
            </div>
        </div>
    )
}

export default Gstcmp02form
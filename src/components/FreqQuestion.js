import React from 'react'
import Faq from 'react-faq-component';

/**
 * Frequently Asked Questions component.
 * 
 * @component
 */

const data = {
    title: "Returns & Refunds",
    rows: [
        {
            title: "How long do I have to initiate my request for a refund or replacement?",
            content: "You can initiate your request for refund or replacement within 7 days of delivery. For example: If you received your order on the 5th, then you have until the 12th to request a return."
        },
        {
            title: "How do I pack my return parcel to make sure it arrives in adequate condition?",
            content: `The product must be returned in the original and undamaged manufacturer packaging / box. If the product was delivered in a second layer of Ecommerce website packaging, it must be returned in the same condition with return shipping label attached. Do not put tape or stickers on the manufacturers box.


            Note: If a product is returned to us in an inadequate condition, we reserve the right to send it back to you.`
        },
        {
            title: "Do I have to pay for shipping charges when I return a product?",
            content: "There are no charges for shipping a product back to Ecommerce website."
        },
        {
            title: "How can I track my return?",
            content: "We will send you regular updates about the status of your order via emails and SMS. After your order has left our warehouse and is on its way to you, you can also track its status by entering your tracking number on 'Need Help?'."
        },
        {
            title:'How long will it take to receive my replacement?',
            content:"It will take between 5 and 13 days to send you the replacement product, depending on your location. Please refer to the product page on Ecommerce website for further information about delivery time."
        },
        {
            title:'Do I also get refunded the shipping charges when returning a product?',
            content:"Yes, the refunded amount would also include the shipping amount you were charged."
        }
    ]
}


export default function FreqQuestion() {
    return (

        <div className='pt-5'>
            <Faq data={data} styles={{border:'1px solid gray'}} />
        </div>
    )
}

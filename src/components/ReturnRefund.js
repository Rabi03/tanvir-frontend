import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


/**
 * A functional component representing a tab panel.
 *
 * @param {Object} props - The component's props.
 * @param {number} props.value - The current tab value.
 * @param {number} props.index - The index of the tab.
 * @param {Object} props.other - Other properties.
 * @returns {JSX.Element} The tab panel component.
 */
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

/**
 * Get accessibility properties for a tab.
 *
 * @param {number} index - The index of the tab.
 * @returns {Object} Accessibility properties.
 */
function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

/**
 * A component for handling the return and refund information.
 *
 * @returns {JSX.Element} The ReturnRefund component.
 */
export default function ReturnRefund() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Box sx={{ bgcolor: 'background.paper', width: '100%', marginTop: '20px' }}>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="How to Return a Product" {...a11yProps(0)} sx={{ backgroundColor: 'white', color: 'black' }} />
                    <Tab label="Returns Policy" {...a11yProps(1)} sx={{ backgroundColor: 'white', color: 'black' }} />
                    <Tab label="Refunds Policy" {...a11yProps(2)} sx={{ backgroundColor: 'white', color: 'black' }} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <div className='row'>
                        <ul className='col-8'>
                            <li>Sign in to your website Account, click on “My Account” from bottom.</li>
                            <li>Select the “My Order” section and click on the View all.</li>
                            <li>Please select your desired refund method.</li>
                            <li>Fill in the Return Form along with the available return options (pickup/drop-off)</li>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Delivery Mode</th>
                                        <th scope="col">Return Modality</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Doorstep Delivery</td>
                                        <td>Pickup/DropOff</td>

                                    </tr>
                                    <tr>

                                        <td>Collection Point</td>
                                        <td>Only Drop-off</td>

                                    </tr>
                                </tbody>
                            </table>
                            <li>Pack your return package securely, with the product in the original and undamaged manufacturer's packaging as delivered to you. Write your order number & return tracking number clearly on the outer side of the package.</li>
                            <li>Head to your nearest drop-off point or wait for collection by our pick-up service. While handing over your package to Drop-Off station/ Pickup Agent, please collect the Website Return Acknowledgment paper and reserve it for future reference.</li>
                            <li>Make sure you have written your order number and return tracking number on your package at the time of drop off. You can view your return tracking number as soon as you have filled the Online Return Form and logged your return request.</li>

                        </ul>
                        <div className='col-4'>
                            <div style={{ fontSize: '13px', border: '1px solid gray', padding: '10px 10px 10px 0px', borderRadius: '10px' }}>
                                <h5 style={{ textAlign: 'center' }}>Conditions for Returns</h5>
                                <ol>
                                    <li>The product must be unused, unworn, unwashed, and without any flaws.</li>
                                    <li>Fashion products can be tried on to see if they fit and will still be considered unworn.</li>
                                    <li>If a product is returned to us in an inadequate condition, we reserve the right to send it back to you.</li>
                                    <li>The product must include the original tags, user manual, warranty cards, freebies, and accessories.</li>
                                    <li>The product must be returned in the original and undamaged manufacturer packaging/box.</li>
                                    <li>If the product was delivered in a second layer of Ecommerce website packaging, it must be returned in the same condition with a return shipping label attached.</li>
                                    <li>Do not put tape or stickers on the manufacturer's box.</li>
                                    <li>While you return the item at our hub, please collect the Ecommerce website Return Acknowledgment Form from the Hub and fill it in by yourself.</li>
                                    <li>Keep one copy to yourself, and we will keep another copy of it for the record.</li>
                                    <li>Note: It is important to indicate the order number and return tracking number on your return package to avoid any inconvenience/delay in the process of your return.</li>
                                </ol>
                            </div>
                            <div className='mt-4'>
                                <h5>Popular Links</h5>
                                <a href='/frequs' style={{ fontSize: '12px' }}>Frequently Asked Questions</a>
                            </div>

                        </div>

                    </div>

                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <div className='row'>
                        <div className='col-8'>
                            <h4>Returns Policy</h4>
                            <ul>
                                <li>
                                    If your product is damaged, defective, incorrect, or incomplete at the time of delivery, please raise a return request on Website app or website. Return request must be raised within 14 days for WebsiteMall items or within 7 days for non-WebsiteMall items from the date of delivery.
                                </li>
                                <li>
                                    For electronic appliances & mobile phones related issues after usage or after the return policy period, please check if the product is covered under seller warranty or brand warranty. For more information on warranty claims, please view our Warranty Policy.
                                </li>
                                <li>
                                    For selected categories, we accept a change of mind. Please refer to the section below on Return Policy per Category for more information.
                                </li>

                            </ul>
                            <h4>Valid reasons to return an item</h4>
                            <ul>
                                <li>Delivered product is damaged (i.e. physically destroyed or broken) / defective (e.g. unable to switch on)</li>
                                <li>Delivered product is incomplete (i.e. has missing items and/or accessories)</li>
                                <li>Delivered product is incorrect (i.e. wrong product/size/colour, fake item, or expired)</li>
                                <li>Delivered product does not match the product description or picture (i.e., the product is not as advertised)</li>
                                <li>Delivered product does not fit (i.e., size is unsuitable)</li>
                            </ul>
                        </div>
                        <div className='col-4'>
                            <div style={{ fontSize: '13px', border: '1px solid gray', padding: '10px 10px 10px 0px', borderRadius: '10px' }}>
                                <h5 style={{ textAlign: 'center' }}>Conditions for Returns</h5>
                                <ol>
                                    <li>The product must be unused, unworn, unwashed, and without any flaws.For fashion products, items may be tried on to see if they fit, and this will still be considered as unworn.</li>
                                    <li>The product must include the original tags, user manuals, warranty cards, freebies, invoice, and accessories.</li>
                                    <li>The product must be returned in the original and undamaged manufacturer's packaging/box. If the product was delivered in Ecommerce website packaging/box, the same packaging/box should be returned. Do not put tape or stickers directly on the manufacturer's packaging/box.</li>
                                </ol>
                                <div style={{padding:'5px 30px'}}>
                                    <span style={{fontWeight:'bold'}}>NOTE:</span> It is important to indicate the Order Number and Return Tracking Number on your return package to avoid any inconvenience/delay in your return process.
                                    While handing over your package to Drop-Off station/ Pickup Agent, please collect the Daraz Return Acknowledgment paper and reserve it for future reference.
                                </div>
                            </div>
                            <div className='mt-4'>
                                <h5>Popular Links</h5>
                                <a href='/frequs' style={{ fontSize: '12px' }}>Frequently Asked Questions</a>
                            </div>

                        </div>

                    </div>


                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <h4>Issuance of Refunds</h4>
                    <ul>
                        <li>The processing time of your refund depends on the type of refund and the payment method you used.</li>
                        <li>The refund period/process starts when Website has processed your refund according to your refund type.</li>
                        <li>The refund amount covers the item price and shipping fee for your returned product.</li>

                    </ul>
                    <h4>Refund Types</h4>
                    <ul>
                        <li>Refund from returns - Refund is processed once your item is returned to the warehouse and QC is completed (successful). To learn how to return an item, read our Return Policy.</li>
                        <li>Refunds from cancelled orders - Refund is automatically triggered once cancellation is successfully processed.</li>
                        <li>Refunds from failed deliveries - Refund process starts when the item has reached the seller. Please take note that this may take more time depending on the area of your shipping address. Screen reader support enabled.</li>
                    </ul>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Payment Method</th>
                                <th>Refund Option</th>
                                <th>Refund Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Debit or Credit Card</td>
                                <td>Debit or Credit Card Payment Reversal</td>
                                <td>10 working days</td>
                            </tr>
                            <tr>
                                <td>Equated Monthly Installments</td>
                                <td>Debit or Credit Card</td>
                                <td>10 working days</td>
                            </tr>
                            <tr>
                                <td>Rocket (Wallet DBBL)</td>
                                <td>Mobile Wallet Reversal / Rocket</td>
                                <td>7 working days</td>
                            </tr>
                            <tr>
                                <td>Nagad</td>
                                <td>Mobile Wallet Reversal / Nagad</td>
                                <td>5 working days</td>
                            </tr>
                            <tr>
                                <td>DBBL Nexus (Online Banking)</td>
                                <td>Card Payment Reversal (Nexus)</td>
                                <td>7 working days</td>
                            </tr>
                            <tr>
                                <td>bKash</td>
                                <td>Mobile Wallet Reversal / bKash</td>
                                <td>5 working days</td>
                            </tr>
                            <tr>
                                <td>Cash on Delivery (COD)</td>
                                <td>Bank Deposit</td>
                                <td>5 working days</td>
                            </tr>
                            <tr>
                                <td>Website Refund Voucher</td>
                                <td>Refund Voucher</td>
                                <td>1 working day</td>
                            </tr>
                            <tr>
                                <td>Website Voucher</td>
                                <td>Refund Voucher</td>
                                <td>1 working day</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>Note: Maximum refund timeline excludes weekends and public holidays.</p>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Mode of Refund</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Bank Deposit</td>
                                <td>
                                    The bank account details provided must be correct. The account must be active and should hold some balance.
                                </td>
                            </tr>
                            <tr>
                                <td>Debit Card or Credit Card</td>
                                <td>
                                    If the refunded amount is not reflecting in your card statement after the refund is completed and you have received a notification by Website, please contact your personal bank.
                                </td>
                            </tr>
                            <tr>
                                <td>bKash / Rocket / Nagad Mobile Wallet</td>
                                <td>
                                    Similar to bank deposit, the amount will be refunded to the same mobile account details which you inserted at the time of payment.
                                </td>
                            </tr>
                            <tr>
                                <td>Refund Voucher</td>
                                <td>
                                    Vouchers will be sent to the customer's registered email ID on Website and can be redeemed against the same email ID.
                                </td>
                            </tr>
                        </tbody>
                    </table>


                </TabPanel>
            </SwipeableViews>
        </Box>
    );
}
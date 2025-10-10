import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function SellGiftCatdTC() {
  const faqs = [
    { faqno:1,
      question:"Have you need to wait for a buyer until your gift card sold?",
      answer:"No, You don’t have to wait for a buyer. Once You have submitted your gift card on sellKaro. We will settle your money to your bank account within given timeline."
    },
    { faqno:2,
      question:"How to add Bank Account ?",
      answer:"After logging in, go to your profile and click on Add Bank Account Details Button.Enter your bank account information to set it up for payouts.",
    },
    { faqno:3,
      question:"What is the deduction for selling gift card on SellKaro.",
      answer:"Deduction are different for each brand gift card. It depends on the demand for that particular gift card in the market.Select the gift card in the upper section to see the deduction for that particular gift card."
    },
    {  faqno:4,
      question:"How much secure is to submit gift card details to sellKaro?",
      answer:"Your gift card details are completely safe with us. Once You submit your gift card to Crafin, Your gift card, details securely store to our database with 256 bit encryption. We have also 3 – layer of security to prevent unauthorized access to sensitive data."
    }
  ]
  return (
    <>
    { faqs.map((faq)=><Accordion key={faq.faqno} >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">{faq.question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
        {faq.answer}
          </Typography>
        </AccordionDetails>
      </Accordion>)}

    </>
  );
}

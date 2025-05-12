import React from 'react';
import { motion } from 'framer-motion';
import FAQItem from './FAQItem';

interface Question {
    id: string;
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    questions: Question[];
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ questions }) => {
    return (
        <div className="overflow-hidden">
            {questions.map((question, index) => (
                <FAQItem 
                    key={question.id} 
                    question={question.question} 
                    answer={question.answer}
                    delay={index * 0.1 + 0.2}
                />
            ))}
        </div>
    );
};

export default FAQAccordion;

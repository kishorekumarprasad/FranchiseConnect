import { motion } from 'framer-motion';

export const AnimatedTestimonials = ({ testimonials }) => {
  return (
    <div className="animated-testimonials">
      <div className="testimonials-container">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="testimonial-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="testimonial-content">
              <div className="quote-icon">"</div>
              <p className="testimonial-quote">{testimonial.quote}</p>
              <div className="testimonial-author">
                <div className="author-image">
                  <img src={testimonial.src} alt={testimonial.name} />
                </div>
                <div className="author-info">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <p className="author-designation">{testimonial.designation}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}; 
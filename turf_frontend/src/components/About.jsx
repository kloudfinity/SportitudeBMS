import React from 'react';

const About = () => {
  const features = [
    {
      icon: 'fa-regular fa-calendar',
      title: 'Flexible Booking',
      description: 'Book on your terms with our flexible scheduling options'
    },
    {
      icon: 'fa-regular fa-clock',
      title: '24/7 Availability',
      description: 'Access our facilities any time that suits you best'
    },
    {
      icon: 'fa-solid fa-location-dot',
      title: 'Prime Locations',
      description: 'Conveniently located venues across the city'
    },
    {
      icon: 'fa-solid fa-bullseye',
      title: 'Top Quality',
      description: 'World-class turfs and facilities for the best experience'
    }
  ];

  return (
    <section className="about-section section-padding">
      <div className="container">
        <div className="row text-center heading-part">
          <h2>ABOUT US</h2>
          <h6>Your ultimate destination for sports and entertainment</h6>
          <p>
            Welcome to Sportitude, Kolkata's ultimate hub of adventure, sports, and entertainment! 
            Since opening our doors in 2025, we've been the go-to destination for thrill-seekers, 
            sports enthusiasts, and families looking for the perfect blend of excitement and fun.
          </p>
          <p>
            Here, fun has no limits, excitement knows no bounds, and memories are made at every turn. 
            So step in, gear up, and let the games begin because at Sportitude, the fun never ends!
          </p>
        </div>

        <div className="row g-4">
          {features.map((feature, index) => (
            <div className="col-lg-6" key={index}>
              <div className="about-item">
                <div className="icon-area">
                  <i className={feature.icon}></i>
                </div>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

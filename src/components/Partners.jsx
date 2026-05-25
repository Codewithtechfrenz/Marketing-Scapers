import alchemi from "../assets/images/Alchemistudion.png";
import kairos from "../assets/images/kairosfs logo.png";
import "./Partners.css";

export default function Partners() {
  const partners = [
    { name: "Alchemi Studio", img: alchemi },
    { name: "Kairos FS",      img: kairos  },
  ];

  return (
    <section className="partners-section" id="partners">
      <p className="partners-eyebrow">Trusted Collaborations</p>
      <h2 className="partners-title">Our Partners</h2>

      <div className="partners-grid">
        {partners.map((p) => (
          <div className="partner-card" key={p.name}>
            <img src={p.img} alt={p.name} className="partner-img" />
            <p className="partner-name">{p.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

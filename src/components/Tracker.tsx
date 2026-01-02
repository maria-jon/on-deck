import "../styles/Tracker.scss";

export default function Tracker() {
  return (
  <div className="tracker-wrapper">
    <header>
      <h2>Round 1</h2>
      <div>
        Time: 14m 30s 
        <span> (button)</span>
      </div>
    </header>
    
    <div className="tracker-container">
      <div className="tracker-row head">
        <div className="row-initiative">Initiative</div>
        <div className="row-name">Name</div>
        <div className="row-hp">HP</div>
        <div className="row-ac">AC</div>
        <div className="row-edit">Edit</div>
      </div>
      <div className="tracker-row item">
        <div className="row-initiative">Initiative</div>
        <div className="row-name">Name</div>
        <div className="row-hp">HP</div>
        <div className="row-ac">AC</div>
        <div className="row-edit">Edit</div>
      </div>
      <div className="tracker-row item">
        <div className="row-initiative">Initiative</div>
        <div className="row-name">Name</div>
        <div className="row-hp">HP</div>
        <div className="row-ac">AC</div>
        <div className="row-edit">Edit</div>
      </div>
      <div className="tracker-row item">
        <div className="row-initiative">Initiative</div>
        <div className="row-name">Name</div>
        <div className="row-hp">HP</div>
        <div className="row-ac">AC</div>
        <div className="row-edit">Edit</div>
      </div>
    </div>

    <div className="tracker-controls">
      <div className="control-buttons">
        <button>Next</button>
        <button>Sort</button>
      </div>
      <button>Add new</button>
    </div>
  </div>
  )
};
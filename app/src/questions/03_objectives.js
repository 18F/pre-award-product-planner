var React = require('react');

var defaultStakeholdersText = "Stakeholders for this project include, but are not limited to, ___, ___, the Contracting Officer’s Representative (COR) and the Contracting Officer.";

var DELIVERABLES = {
	"1": "Research, Insights, and Synthesis",
	"2": "Prototype Design Solutions",
	"3": "Recommendations",
	"4": "Program Management and Stewardship",
	"5": "UX requirements gathering",
	"6": "Initial application design and implementation",
	"7": "System configuration to support business processes",
	"8": "Integration for input and output methods",
	"9": "Workflow design and implementation",
	"10": "Overall collaboration of applications",
	"11": "Enhancements, patches, and updates to applications, data, or cloud systems",
	"12": "Data import of records collected from legacy systems",
	"13": "Automated testing",
	"14": "Training of end users on the systems"
}

var Objective = React.createClass({
	getInitialState: function() {
		return {
			docType: localStorage.getItem("docType"),
			agency: localStorage.getItem("agency"),
			maxBudget: 0,
		};
	},
	componentDidMount: function() {
    get_data("max_budget", function(content){ 
      this.setState({
        maxBudget: content,
      });
    }.bind(this));
  },
	handleChange: function(key, event) {
		switch(key) {
			case "maxBudget":
				this.setState({
					maxBudget : event.target.value,
				});
				break;
			case "stakeholders":
				this.setState({
					stakeholders : event.target.value,
				});
				break;
		}
	},
	save: function(cb) {
		put_data("maxBudget", this.state.text);
		setTimeout(cb, 500);
	},
	render: function() {

		var deliverables = [];
		for(var key in DELIVERABLES) {
			deliverables.push(
				<div className="checkbox">
					<label>
						<input type="checkbox" value={key} />{ DELIVERABLES[key] }
				  </label>
				</div>
			);
		}

		return (
			<div>
				<div className="main-heading">Statement of Objectives</div>
				<p>This section has many components.</p>

				<div className="sub-heading">General Background</div>
				<p>Please provide several paragraphs about your project's history, mission, and current state.</p>

				<textarea className="form-control" rows="9"></textarea>

				<div className="sub-heading">Program History</div>
				<p>If you have any information about the current vendors and specific technology being used please provide it here.</p>

				<textarea className="form-control" rows="10"></textarea>

				<div className="sub-heading">Objectives</div>
				<p>Note: The Statement of Objectives will be removed at time of award and replaced with the Offeror’s Performance Work Statement. All listed objectives and requirements shall be included as part of the Offeror’s Performance Work Statement.</p>

				<p>What is the maximum budget for your project?</p>
				<form className="form-inline">
					<div className="form-group">
						<div className="input-group">
							<div className="input-group-addon">$</div>
	    				<input type="text" className="form-control short-response" placeholder="ex: 10,000,000" value={this.state.maxBudget} onChange={this.handleChange.bind(this, "maxBudget")}></input>
	    			</div>
	    		</div>
				</form>

				<p>The government is willing to invest a maximum budget of ${this.state.maxBudget} in this endeavor.</p>

				<div className="sub-heading">Overview </div>

					<p>The primary users of this X are:</p>
					<div className="checkbox">
					  <label>
					    <input type="checkbox" value=""></input>
					    Internal (people)
					  </label>
					</div>
					<div className="checkbox">
					  <label>
					    <input type="checkbox" value=""></input>
					    External (people)
					  </label>
					</div>
					<div className="checkbox">
					  <label>
					    <input type="checkbox" value=""></input>
					    Internal (systems)
					  </label>
					</div>
					<div className="checkbox">
					  <label>
					    <input type="checkbox" value=""></input>
					    External (systems, developers)
					  </label>
					</div>

				<p>Has anyone working on this project done any user research? (Learn more <a href="https://playbook.cio.gov/#play1" target="_blank">here</a>!)</p>

				<div className="checkbox">
					  <label>
					    <input type="checkbox" value=""></input>
					    Yes
					  </label>
					</div>
					<div className="checkbox">
					  <label>
					    <input type="checkbox" value=""></input>
					    No, but our team intends to
					  </label>
					</div>
					<div className="checkbox">
					  <label>
					    <input type="checkbox" value=""></input>
					    No, this will be carried out by the vendor
					  </label>
					</div>

					<p>The (group responsible) for this contract commit to support the vendor in the user research process, and will provide the vendor with access to the government employees who will be the users of the product.</p>

					<p>The primary users of this [XXX] will include X, Y, Z. To ensure the system supports interoperability, XX must be followed. (see section). To ensure the user interface is X, Y (playbook language) @TODO</p>
					<ol>
						<li>Early in the project, spend time with current and prospective users of the service</li>
						<li>Use a range of qualitative and quantitative research methods to determine people’s goals, needs, and behaviors; be thoughtful about the time spent</li>
						<li>Test prototypes of solutions with real people, in the field if possible</li>
						<li>Document the findings about user goals, needs, behaviors, and preferences</li>
						<li>Share findings with the team and agency leadership</li>
						<li>Create a prioritized list of tasks the user is trying to accomplish, also known as "user stories"</li>
						<li>As the digital service is being built, regularly test it with potential users to ensure it meets people’s needs</li>
					</ol>

				<p>What is your User Research Strategy?</p>
			
					<div className="radio">
					  <label>
					    <input type="radio" value=""></input>
							Research has already been conducted, either internally or by another vendor. (proceed to product/program vision questionnaire)
					  </label>
					</div>
					<div className="radio">
					  <label>
					    <input type="radio" value=""></input>
					    We intend to conduct user research internally prior to the start date of this engagement.
					  </label>
					</div>
					<div className="radio">
					  <label>
					    <input type="radio" value=""></input>
					    The vendor will be responsible for the user research. 
					  </label>
					</div>
			

				<div className="sub-heading">Specific Tasks and Deliverables</div>
				<p>Deliverables may include:</p>
					{deliverables}

				<div className="sub-heading">Deliverables</div>
				<p>Would you like to use ...?</p>
				<p>A deliverably will be considered complete and acceptable when it meets the contractor's "Definition of Done".</p>
				<p>Each deliverable shall incorporate agency IT requirements as detailed in the Appendix of this document and the <a href="https://playbook.cio.gov" target="_blank">United States Digital Service Playbook</a> standards and be compliant with Section 508. (see <a>here</a>)</p>
				<div>Deliverables - https://quip.com/SFN4AAN4NA2F</div>
				<p>Functional Requirements, translated into Epics and User Stories that will be used to populate the Product Backlog may include, but are not limited to:
					  UX requirements gathering
					•	Initial application design and implementation
					•	System configuration to support business processes
					•	Integration for input and output methods
					•	Workflow design and implementation
					•	Overall collaboration of applications
					•	Enhancements, patches, and updates to applications, data, or cloud systems
					•	Data import of records collected from legacy systems
					•	Automated testing
					•	Training of end users on the systems</p>

				<div className="sub-heading">Stakeholders</div>
				<p>Feel free to add additional stakeholders as is relevant to your project.</p>
				<textarea className="form-control" rows="4" value={this.state.stakeholders} onChange={this.handleChange.bind(this, "stakeholders")}>
				</textarea>

				<div className="sub-heading">Agile Development Management Plan (ADMP) and Key Personnel</div>
				<p>Offerors shall propose an Agile Development Management Plan (ADMP) which demonstrates how the Offeror intends to manage, develop, implement, and maintain the requirements described in this SOO and the RFQ. The plan shall include, at a minimum:</p>
				<p>The performance work statement will include:</p>
				<ul>
					<li>Contact information for all senior leaders and an organizational chart showing the Offeror’s organizational hierarchy and reporting structure, with specific designation of individuals as Key Personnel;
					</li>
					<li>Management resources;
					</li>
					<li>Technical resources and skill sets required to develop, implement, and maintain the proposed solution; and
					</li>
					<li>Details on the management of the Offeror’s team that will be on-site.
					</li>
				</ul>
				<p>The ADMP and the listing of Key Personnel shall become part of the {this.state.docType} upon award.</p>

				<div className="sub-heading">Kick-Off Meeting/Post-Award Conference</div>
				<p>Is there a required place of performance? What region the work will be done?</p>

				<p>@TODO Move location question in section 7 to here and add follow up question</p>
				<p>The agency's relevant personnel, Contracting Officer, and COR shall hold a Kick-Off meeting/Post-Award Conference in Washington, DC with contractor’s team and other relevant Government staff to review and clarify the project’s objectives, expectations from the Government, and address any questions the Contractor may have.</p>
				<p>The Contractor shall provide and collaborate with the COR on an agenda for this meeting. Discussion topics shall include, but not be limited to: introduction of the Contractor and Government Staff; understanding of the specific tasks and subtasks; project management expectations; agreement on meeting schedules; and agreement on initial delivery dates.</p>
				<p>The Kick-Off meeting/Post-Award Conference will take place within 10 days from award and will be scheduled by the Contracting Officer.</p>

				<div className="sub-heading">System Documentation and Training</div>
				<p>Do you believe training will be required? @TODO ask VA & 18F consulting</p>
				<p>Would you like a collaborative workspace (phrasing)
				strongly encourage the use of a collaborative environment, do you have one?
				GSA - google drive, other places, ???
				check with agency policy to see which collaboration software is allowed. ex: box.com, google drive/google docs, 
				code - version control, define what is, examples. (encourage certain options, but vendor will specify)
				for documents is separate
				</p>
				<p>Github: version control</p>
				<p>The Contractor shall:</p>
				<ul>
					<li>Provide all system documentation and training to {this.state.agency} staff (in-person, video, and via webinar).</li>
					<li>Develop and provide effective training materials of all deliverables, including, but not limited to, “train the trainer” documentation.</li>
					<li>Conduct “train the trainer” sessions for {this.state.agency} staff.</li>
					<li>Consult with the COR to determine what is appropriate, effective, and essential for training.</li>
				</ul>

				<p className="new-content">Furthermore, documentation should be updated with each iteration. This includes technical documentation including but not limited to setup instructions in the README.md, user reseach findings etc. All documents should be stored electronically such that the CO, PM, and any other relevant government employees who have been granted permissions can access them at any time.</p>

			</div>
		);
	},
});

module.exports = Objective;
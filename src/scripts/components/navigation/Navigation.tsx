import * as React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
	return (
		<div className="navigation">
			<NavLink className="navItem" activeClassName="navItem--active" to="/" exact>HOME / README</NavLink>

			<NavLink className="navItem" activeClassName="navItem--active" to="/api">API</NavLink>
			<NavLink className="subNavItem" activeClassName="subNavItem--active" to="/api/reactiveMobxForm()">reactiveMobxForm()</NavLink>
			<NavLink className="subNavItem" activeClassName="subNavItem--active" to="/api/configureValidator()">configureValidator()</NavLink>
			<NavLink className="subNavItem" activeClassName="subNavItem--active" to="/api/ReactiveForm">ReactiveForm</NavLink>
			<NavLink className="subNavItem" activeClassName="subNavItem--active" to="/api/props">props</NavLink>

			<NavLink className="navItem" activeClassName="navItem--active" to="/examples">EXAMPLES</NavLink>
			<NavLink className="subNavItem" activeClassName="subNavItem--active" to="/examples/simple/SimpleForm">Simple Form</NavLink>
			<NavLink className="subNavItem" activeClassName="subNavItem--active" to="/examples/sync-validation/SyncFieldValidation">Sync Field Validation</NavLink>
			<NavLink className="subNavItem" activeClassName="subNavItem--active" to="/examples/control-section/ControlSection">ControlSection</NavLink>
			<NavLink className="subNavItem" activeClassName="subNavItem--active" to="/examples/control-array/ControlArray">ControlArray</NavLink>
			<NavLink className="subNavItem" activeClassName="subNavItem--active" to="/examples/computed-control/ComputedControl">ComputedControl</NavLink>
			<NavLink className="subNavItem" activeClassName="subNavItem--active" to="/examples/multi-step/MultiStep">Multi Step (Wizard) Form</NavLink>
			<NavLink className="navItem" activeClassName="navItem--active" to="/donate">DONATE</NavLink>
		</div>
	)
}

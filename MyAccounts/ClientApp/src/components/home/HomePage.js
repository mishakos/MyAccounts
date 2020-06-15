import React from "react";


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };

        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);

    }

    handleDrawerToggle() {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
      return (
        <div>
          <h1>My Accounts Application </h1>
        </div>
        );
    }
}

export default HomePage;
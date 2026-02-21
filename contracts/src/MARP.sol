// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title MARP — Monad Agent Reputation Protocol
 * @notice Registro on-chain de reputación por agente. Score sube/baja con outcomes. Staking social amplifica cambios.
 */
contract MARP {
    struct Agent {
        string name;
        int256 score;
        uint256 totalOps;
        uint256 wins;
        address owner;
        bool registered;
    }

    mapping(address => Agent) public agents;
    mapping(address => mapping(address => uint256)) public stakes; // staker => agent => amount
    mapping(address => uint256) public totalStakeOnAgent; // total MON staked on each agent
    address[] public agentList;

    event AgentRegistered(address indexed agent, string name);
    event OutcomeReported(address indexed agent, bool success, int256 delta);
    event Staked(address indexed staker, address indexed agent, uint256 amount);

    function register(string calldata name) external {
        require(!agents[msg.sender].registered, "Already registered");
        agents[msg.sender] = Agent(name, 0, 0, 0, msg.sender, true);
        agentList.push(msg.sender);
        emit AgentRegistered(msg.sender, name);
    }

    function reportOutcome(address agent, bool success, uint256 magnitude) external {
        require(agents[agent].registered, "Not registered");
        int256 delta = int256(magnitude);
        if (!success) delta = -delta;

        uint256 totalStaked = totalStakeOnAgent[agent];
        if (totalStaked > 0) delta = delta * 110 / 100; // +10% boost

        agents[agent].score += delta;
        agents[agent].totalOps++;
        if (success) agents[agent].wins++;

        emit OutcomeReported(agent, success, delta);
    }

    function stake(address agent) external payable {
        require(agents[agent].registered, "Not registered");
        require(msg.value > 0, "Zero stake");
        stakes[msg.sender][agent] += msg.value;
        totalStakeOnAgent[agent] += msg.value;
        emit Staked(msg.sender, agent, msg.value);
    }

    function getTotalStake(address agent) external view returns (uint256) {
        return totalStakeOnAgent[agent];
    }

    function getAllAgents() external view returns (address[] memory) {
        return agentList;
    }

    function getAgentInfo(address agent) external view returns (
        string memory name,
        int256 score,
        uint256 totalOps,
        uint256 wins,
        address owner,
        bool registered
    ) {
        Agent memory a = agents[agent];
        return (a.name, a.score, a.totalOps, a.wins, a.owner, a.registered);
    }
}

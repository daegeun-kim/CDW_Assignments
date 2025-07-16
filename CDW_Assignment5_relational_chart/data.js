const data1 = {
  nodes: [
    { name: "Actor-Motorist: 86,996", category: "Actor" },
    { name: "Actor-Cyclist: 765", category: "Actor" },
    { name: "Victim-Motorist: 73,253", category: "Victim" },
    { name: "Victim-Cyclist: 4,708", category: "Victim" },
    { name: "Victim-Pedestrian: 10,264", category: "Victim" }
  ],
  links: [
    { source: "Actor-Motorist: 86,996", target: "Victim-Motorist: 73,253", value: 73253 },
    { source: "Actor-Motorist: 86,996", target: "Victim-Cyclist: 4,708", value: 4708 },
    { source: "Actor-Motorist: 86,996", target: "Victim-Pedestrian: 10,264", value: 9499 },
    { source: "Actor-Cyclist: 765", target: "Victim-Pedestrian: 10,264", value: 765 }
  ]
};

const data2 = {
  nodes: [
    { name: "Actor-Motorist: 155,178", category: "Actor" },
    { name: "Actor-Cyclist: 2,131", category: "Actor" },
    { name: "Victim-Motorist: 115,121", category: "Victim" },
    { name: "Victim-Cyclist: 11,985", category: "Victim" },
    { name: "Victim-Pedestrian: 31,010", category: "Victim" }
  ],
  links: [
    { source: "Actor-Motorist: 155,178", target: "Victim-Motorist: 115,121", value: 115121 },
    { source: "Actor-Motorist: 155,178", target: "Victim-Cyclist: 11,985", value: 11985 },
    { source: "Actor-Motorist: 155,178", target: "Victim-Pedestrian: 31,010", value: 28879 },
    { source: "Actor-Cyclist: 2,131", target: "Victim-Pedestrian: 31,010", value: 2131 }
  ]
};

const data3 = {
  nodes: [
    { name: "Actor-Motorist: 244,413", category: "Actor" },
    { name: "Actor-Cyclist: 3,580", category: "Actor" },
    { name: "Victim-Motorist: 176,814", category: "Victim" },
    { name: "Victim-Cyclist: 24,318", category: "Victim" },
    { name: "Victim-Pedestrian: 48,357", category: "Victim" }
  ],
  links: [
    { source: "Actor-Motorist: 244,413", target: "Victim-Motorist: 176,814", value: 176814 },
    { source: "Actor-Motorist: 244,413", target: "Victim-Cyclist: 24,318", value: 24318 },
    { source: "Actor-Motorist: 244,413", target: "Victim-Pedestrian: 48,357", value: 44777 },
    { source: "Actor-Cyclist: 3,580", target: "Victim-Pedestrian: 48,357", value: 3580 }
  ]
};

const data4 = {
  nodes: [
    { name: "Actor-Motorist: 203,117", category: "Actor" },
    { name: "Actor-Cyclist: 3,218", category: "Actor" },
    { name: "Victim-Motorist: 144,765", category: "Victim" },
    { name: "Victim-Cyclist: 21,557", category: "Victim" },
    { name: "Victim-Pedestrian: 41,321", category: "Victim" }
  ],
  links: [
    { source: "Actor-Motorist: 203,117", target: "Victim-Motorist: 144,765", value: 144765 },
    { source: "Actor-Motorist: 203,117", target: "Victim-Cyclist: 21,557", value: 21557 },
    { source: "Actor-Motorist: 203,117", target: "Victim-Pedestrian: 41,321", value: 38103 },
    { source: "Actor-Cyclist: 3,218", target: "Victim-Pedestrian: 41,321", value: 3218 }
  ]
};
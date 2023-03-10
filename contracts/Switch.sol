// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Switch {
    struct WiredSwitch {
        bool firstSwitch;
        bool secondSwitch;
    }

    enum Toggle {
        firstSwitch,
        SecondSwitch
    }

    /// Simple light switch.
    bool public lightSwitch;

    /// This switch has models two light switches with one weird property.
    /// Whenever switch one is turned off, switch two also goes off.
    WiredSwitch public wiredSwitch;

    constructor(bool _lighSwtich, WiredSwitch memory _wiresSwitch) payable {
        wiredSwitch = _wiresSwitch;
        lightSwitch = _lighSwtich;
    }

    function toggleLightSwitch() external {
        lightSwitch = !lightSwitch;
    }

    function toggleWiredSwitch(Toggle toggle) external {
        if (toggle == Toggle.SecondSwitch) {
            wiredSwitch.firstSwitch = wiredSwitch.firstSwitch;
            wiredSwitch.secondSwitch = !wiredSwitch.secondSwitch;
        } else {
            wiredSwitch.firstSwitch = !wiredSwitch.firstSwitch;

            if(!wiredSwitch.firstSwitch) {
                wiredSwitch.secondSwitch = false;
            }
        }
    }

}

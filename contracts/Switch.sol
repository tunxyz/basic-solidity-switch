// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Switch {

    // TODO: 1.Create struct of WiredSwitch that contains two field firstSwitch and secondSwitch with type boolean.
    struct WiredSwitch {
        bool firstSwitch;
        bool secondSwitch;
    }

    // TODO: 2.Create enum of Toggle that contains two field firstSwitch and secondSwitch.
    enum Toggle {
        firstSwitch,
        secondSwitch
    }

    // TODO: 3.Create variable lightSwitch with type boolean.

    bool public lightSwitch;

	// TODO: 4.Create variable wiredSwitch with type WiredSwitch struct.
    WiredSwitch public wiredSwitch;


    // TODO: 5.Create construct that receive two argument with initail state of two switch.
    constructor(bool _lightSwitch, WiredSwitch memory _wiredSwitch) {
        lightSwitch = _lightSwitch;
        wiredSwitch = _wiredSwitch;
    }

    // TODO: 6.Create toggle switch function
    function toggleLightSwitch() external {
        lightSwitch = !lightSwitch;
        /// code here
    }

    // TODO: 7.Create toggle wired switch function according to testcase.
    function toggleWiredSwitch(Toggle _toggle) external {
        if (_toggle == Toggle.secondSwitch) {
            wiredSwitch.firstSwitch = wiredSwitch.firstSwitch;
            wiredSwitch.secondSwitch = !wiredSwitch.secondSwitch;    
        }  else { 
            wiredSwitch.firstSwitch = !wiredSwitch.firstSwitch;
            if(!wiredSwitch.firstSwitch){
                wiredSwitch.secondSwitch = false;

            }
        }
    }

}

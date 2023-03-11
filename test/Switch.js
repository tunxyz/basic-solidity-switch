const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Switch", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function getSwitchFixture() {
    const [alice, bob] = await ethers.getSigners();

    const Switch = await ethers.getContractFactory("Switch");

    const Toggle = {
      firstSwitch: 0,
      secondSwitch: 1
    }

    return { Switch, alice, bob, Toggle };
  }

  describe("LightSwitch", function () {
    it("Should turn off when initial state is on", async function () {
      const { Switch } = await loadFixture(getSwitchFixture);

      const initialLightSwitch = true;
      const initialWiredSwitch = { firstSwitch: false, secondSwitch: false };

      const switchContract = await Switch.deploy(initialLightSwitch, initialWiredSwitch);

      await switchContract.toggleLightSwitch()

      expect(await switchContract.lightSwitch()).to.be.false

    });

    it("Should turn on when initial state is off", async function () {
      const { Switch } = await loadFixture(getSwitchFixture);

      const initialLightSwitch = false;
      const initialWiredSwitch = { firstSwitch: false, secondSwitch: false };

      const switchContract = await Switch.deploy(initialLightSwitch, initialWiredSwitch);

      await switchContract.toggleLightSwitch()

      expect(await switchContract.lightSwitch()).to.be.true

    });

  });

  describe("WiredSwitch", function () {
    describe("Toggle first switch", function () {
      it("Should work when initial state is (false, false)", async function () {
        const { Switch, Toggle } = await loadFixture(getSwitchFixture);

        const initialLightSwitch = true;
        const initialWiredSwitch = { firstSwitch: false, secondSwitch: false };

        const switchContract = await Switch.deploy(initialLightSwitch, initialWiredSwitch);

        await switchContract.toggleWiredSwitch(Toggle.firstSwitch)

        const wiredSwitch = await switchContract.wiredSwitch()

        expect(wiredSwitch.firstSwitch).to.be.true
        expect(wiredSwitch.secondSwitch).to.be.false

      });

      it("Should work when initial state is (true, true)", async function () {
        const { Switch, Toggle } = await loadFixture(getSwitchFixture);

        const initialLightSwitch = true;
        const initialWiredSwitch = { firstSwitch: true, secondSwitch: true };

        const switchContract = await Switch.deploy(initialLightSwitch, initialWiredSwitch);

        await switchContract.toggleWiredSwitch(Toggle.firstSwitch)

        const wiredSwitch = await switchContract.wiredSwitch()

        expect(wiredSwitch.firstSwitch).to.be.false
        expect(wiredSwitch.secondSwitch).to.be.false

      });

      it("Should work when initial state is (true, false)", async function () {
        const { Switch, Toggle } = await loadFixture(getSwitchFixture);

        const initialLightSwitch = true;
        const initialWiredSwitch = { firstSwitch: true, secondSwitch: false };

        const switchContract = await Switch.deploy(initialLightSwitch, initialWiredSwitch);

        await switchContract.toggleWiredSwitch(Toggle.firstSwitch)

        const wiredSwitch = await switchContract.wiredSwitch()

        expect(wiredSwitch.firstSwitch).to.be.false
        expect(wiredSwitch.secondSwitch).to.be.false

      });

    });

    describe("Toggle second switch", function () {
      it("Should work when initial state is (false, false)", async function () {
        const { Switch, Toggle } = await loadFixture(getSwitchFixture);

        const initialLightSwitch = true;
        const initialWiredSwitch = { firstSwitch: false, secondSwitch: false };

        const switchContract = await Switch.deploy(initialLightSwitch, initialWiredSwitch);

        await switchContract.toggleWiredSwitch(Toggle.secondSwitch)

        const wiredSwitch = await switchContract.wiredSwitch()

        expect(wiredSwitch.firstSwitch).to.be.false
        expect(wiredSwitch.secondSwitch).to.be.true

      });

      it("Should work when initial state is (true, true)", async function () {
        const { Switch, Toggle } = await loadFixture(getSwitchFixture);

        const initialLightSwitch = true;
        const initialWiredSwitch = { firstSwitch: true, secondSwitch: true };

        const switchContract = await Switch.deploy(initialLightSwitch, initialWiredSwitch);

        await switchContract.toggleWiredSwitch(Toggle.secondSwitch)

        const wiredSwitch = await switchContract.wiredSwitch()

        expect(wiredSwitch.firstSwitch).to.be.true
        expect(wiredSwitch.secondSwitch).to.be.false

      });

      it("Should work when initial state is (true, false)", async function () {
        const { Switch, Toggle } = await loadFixture(getSwitchFixture);

        const initialLightSwitch = true;
        const initialWiredSwitch = { firstSwitch: true, secondSwitch: false };

        const switchContract = await Switch.deploy(initialLightSwitch, initialWiredSwitch);

        await switchContract.toggleWiredSwitch(Toggle.secondSwitch)

        const wiredSwitch = await switchContract.wiredSwitch()

        expect(wiredSwitch.firstSwitch).to.be.true
        expect(wiredSwitch.secondSwitch).to.be.true

      });

    });

  });

});

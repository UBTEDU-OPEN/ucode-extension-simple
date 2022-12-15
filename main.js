/**
 * 案例积木块类
 */
class ExampleExtension {
  getInfo() {
    return {
      name: "案例",
      color1: "#0FBD8C",
      color2: "#0DA57A",
      color3: "#0B8E69",
      blocks: [
        {
          opcode: "helloWorld",
          blockType: self.UCode.BlockType.REPORTER,
          arguments: {},
          text: "Click Me",
          func: "helloWorld",
        },
      ],
    };
  }

  async helloWorld(args, util) {
    return "Hello World!";
  }
}

/**
 * 案例设备类
 */
class ExampleDevice {
  constructor(injectArgs) {
    this.eventbus = injectArgs.eventbus;
  }

  /**
   * 连接设备
   * @returns {Promise<void>}
   */
  connect(device) {
    console.log("worker demo connect device ");
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.eventbus.dispatchConnect();
        resolve();
      }, 2000);
    });
  }

  disconnect() {
    this.eventbus.dispatchDisconnect();
    return Promise.resolve();
  }

  /**
   * 设备销毁
   */
  destroy() {
    this.disconnect();
    return Promise.resolve();
  }
}

const DeviceRegister = {
  DeviceType: {
    id: `my-first-ext`,
    name: `虚拟连接`,
    connectType: "auto",
    tip: {
      type: "markdown",
      data: `# 这是一个虚拟连接, 永远都会连接成功, 但是需要等待两秒`,
    },
  },
  DeviceConnection: ExampleDevice,
};

/** 注册插件 */
self.UCode.extensions.register({
  DeviceRegister: DeviceRegister,
  BlockRegister: ExampleExtension,
});

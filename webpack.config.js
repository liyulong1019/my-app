// 导入必要的模块
const path = require("path");
// const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 用于生成HTML文件的插件
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer"); // 查看打包后具体情况的插件

// 定义配置对象
module.exports = {
  // 入口文件，webpack将从这里开始递归地构建依赖关系图
  entry: "./src/index.js",

  // 输出目录和文件名
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/",
    assetModuleFilename: "images/[hash][ext][query]",
  },

  resolve: {
    extensions: [".js", ".json", ".jsx", ".css", ".less"],
    alias: {
      "@common": path.resolve(__dirname, "src/common"),
      "@components": path.resolve(__dirname, "src/common/components"),
      "@use": path.resolve(__dirname, "src/common/use"),
      "@utils": path.resolve(__dirname, "src/common/utils"),
      "@modules": path.resolve(__dirname, "src/modules"),
    },
  },

  // loader配置，用于预处理不同类型的模块资源
  module: {
    rules: [
      {
        test: /\.js(x)?$/, // 匹配.js文件
        exclude: /node_modules/, // 排除node_modules下的文件
        use: [
          {
            loader: "babel-loader", // 使用 babel-loader
            options: {
              // 可以在此处配置 Babel 的具体选项
              presets: ["@babel/preset-env", "@babel/preset-react"], // 使用 @babel/preset-env 来自动确定需要转换的语法特性
            },
          },
        ], // 使用Babel转换ES6+语法
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.svg/,
        use: {
          loader: "svg-url-loader",
          options: {},
        },
      },
      {
        test: /\.less$/, // 匹配.less文件
        use: [
          "style-loader", // 将CSS注入到DOM中
          "css-loader", // 解析CSS中的import和url()
          {
            loader: "postcss-loader", // 添加浏览器前缀
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")()],
              },
            },
          },
          "less-loader",
        ],
      },
      {
        test: /\.module.less$/, // 匹配.less文件
        use: [
          "style-loader", // 将CSS注入到DOM中
          "css-loader", // 解析CSS中的import和url()
          {
            loader: "postcss-loader", // 添加浏览器前缀
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")],
              },
            },
          },
          "less-loader",
        ],
      },
      {
        test: /\.css$/, // 匹配.css文件
        use: [
          "style-loader", // 将CSS注入到DOM中
          "css-loader", // 解析CSS中的import和url()
        ],
      },
    ],
  },

  // 插件配置，扩展webpack功能
  plugins: [
    new HtmlWebpackPlugin({
      // 自动生成一个HTML文件，并引入编译后的JS文件
      template: "./public/index.html",
      filename: "index.html",
      inject: "body", // 将脚本注入到 body 中
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "server", // 指定分析器的工作模式为服务器模式。
      generateStatsFile: true, // 是否生成 stats.json 文件
      statsFilename: "stats.json", // 生成的报告文件名
    }),
    // new webpack.DefinePlugin({
    //   "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    // }),
  ],

  // 开发服务器配置（可选）
  devServer: {
    static: {
      directory: path.resolve(__dirname, "./dist"), // 本地服务器目录
    },
    hot: true, // 开启热更新
    compress: true, // 当前资源是否压缩
    open: true, // 自动打开浏览器
    // overlay: true, // 显示错误覆盖层
    historyApiFallback: true, // 单页应用路由
    port: 3000, // 设置端口号
  },
};

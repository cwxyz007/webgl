# Shader

Shader 语法是 [GLSL]， 分为 `Vertex Shader` 和 `Fragment Shader`

多个 `Vertex Shader` 加上多个 `Fragment Shader` 称之为 `Shader Program`

## Vertex Shader

当一个形状渲染完之后，`Vertex Shader` 会在渲染的每个顶点执行一次

`Vertex Shader` 的作用是把输入的顶点的原始坐标转换到裁剪坐标(clip-space)，即把原始坐标转换成 `[-1.0,1.0]`

转换过后的坐标存储到 `GLSL` 提供 `gl_Position` 变量里

`Vertex Shader` 可以决定纹理图的位置和光线因素， 这些信息可以存储到 `varyings` 或者 `attributes` 来和 `Fragment Shader` 共享

## Fragment Shader

当一个形状渲染完后，`Vertex Shader` 执行完之后，`Fragment Shader` 会应用于每一个像素

`Fragment Shader` 的作用是根据材质，光影等信息决定每个像素的最终颜色，然后存储到 [GLSL] 提供的 `gl_FragColor` 变量里

[glsl]: https://www.khronos.org/files/opengles_shading_language.pdf

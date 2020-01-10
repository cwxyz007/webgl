# GLSL variables

GLSL 的[Data_Type]常用的有 `attributes` `varyings` `uniforms`

## Attributes

`Attributes` 只能用于 `Vertex Shader` 和 JS 代码中

`Attributes` 一般用于存储 颜色、纹理坐标、或者其他需要和 JS 代码共享的数据

## Varyings

`Varyings` 在 `Vertex Shader` 中申明，用于将计算后的数据传递给 `Fragment Shader`，一般用于传递计算后的法向量

## Uniforms

`Uniforms` 由 JS 代码设置，在 `Vertex Shader` 和 `Fragment Shader` 中都可用

一般用于存储 `Vertex Shader` 和 `Fragment Shader` 公用的一些数据

例如光的大小和强度，全局转换和透视矩阵等

[data_type]: https://www.khronos.org/opengl/wiki/Data_Type_(GLSL)

import{o as e,r as t,t as n}from"./index-gebmCdTz.js";import{A as r,C as i,M as a,O as o,T as s,_ as c,a as l,c as u,d,f,g as p,h as m,i as ee,j as h,k as g,l as _,n as v,o as y,p as b,r as x,t as S,u as C}from"./extends-C8hQFeL2.js";var w=parseInt(`185`.replace(/\D+/g,``)),T=w>=125?`uv1`:`uv2`,E=new y,D=new r,O=class extends C{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type=`LineSegmentsGeometry`,this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute(`position`,new _([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute(`uv`,new _([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new d(t,6,1);return this.setAttribute(`instanceStart`,new f(n,3,0)),this.setAttribute(`instanceEnd`,new f(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));let r=new d(n,t*2,1);return this.setAttribute(`instanceColorStart`,new f(r,t,0)),this.setAttribute(`instanceColorEnd`,new f(r,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new a(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new y);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),E.setFromBufferAttribute(t),this.boundingBox.union(E))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new s),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let r=0;for(let i=0,a=e.count;i<a;i++)D.fromBufferAttribute(e,i),r=Math.max(r,n.distanceToSquared(D)),D.fromBufferAttribute(t,i),r=Math.max(r,n.distanceToSquared(D));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error(`THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.`,this)}}toJSON(){}applyMatrix(e){return console.warn(`THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4().`),this.applyMatrix4(e)}},k=class extends O{constructor(){super(),this.isLineGeometry=!0,this.type=`LineGeometry`}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let r=0;r<t;r+=3)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];return super.setPositions(n),this}setColors(e,t=3){let n=e.length-t,r=new Float32Array(2*n);if(t===3)for(let i=0;i<n;i+=t)r[2*i]=e[i],r[2*i+1]=e[i+1],r[2*i+2]=e[i+2],r[2*i+3]=e[i+3],r[2*i+4]=e[i+4],r[2*i+5]=e[i+5];else for(let i=0;i<n;i+=t)r[2*i]=e[i],r[2*i+1]=e[i+1],r[2*i+2]=e[i+2],r[2*i+3]=e[i+3],r[2*i+4]=e[i+4],r[2*i+5]=e[i+5],r[2*i+6]=e[i+6],r[2*i+7]=e[i+7];return super.setColors(r,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}},A=class extends i{constructor(e){super({type:`LineMaterial`,uniforms:o.clone(o.merge([l.common,l.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new g(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${w>=154?`colorspace_fragment`:`encodings_fragment`}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA=`1`:delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return`WORLD_UNITS`in this.defines},set:function(e){e===!0?this.defines.WORLD_UNITS=``:delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return`USE_DASH`in this.defines},set(e){!!e!=`USE_DASH`in this.defines&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH=``:delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return`USE_ALPHA_TO_COVERAGE`in this.defines},set:function(e){!!e!=`USE_ALPHA_TO_COVERAGE`in this.defines&&(this.needsUpdate=!0),e===!0?(this.defines.USE_ALPHA_TO_COVERAGE=``,this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}},j=new h,M=new r,N=new r,P=new h,F=new h,I=new h,L=new r,R=new p,z=new b,B=new r,V=new y,H=new s,U=new h,W,G;function K(e,t,n){return U.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),U.multiplyScalar(1/U.w),U.x=G/n.width,U.y=G/n.height,U.applyMatrix4(e.projectionMatrixInverse),U.multiplyScalar(1/U.w),Math.abs(Math.max(U.x,U.y))}function q(e,t){let n=e.matrixWorld,i=e.geometry,a=i.attributes.instanceStart,o=i.attributes.instanceEnd,s=Math.min(i.instanceCount,a.count);for(let i=0,c=s;i<c;i++){z.start.fromBufferAttribute(a,i),z.end.fromBufferAttribute(o,i),z.applyMatrix4(n);let s=new r,c=new r;W.distanceSqToSegment(z.start,z.end,c,s),c.distanceTo(s)<G*.5&&t.push({point:c,pointOnLine:s,distance:W.origin.distanceTo(c),object:e,face:null,faceIndex:i,uv:null,[T]:null})}}function te(e,t,n){let i=t.projectionMatrix,a=e.material.resolution,o=e.matrixWorld,s=e.geometry,c=s.attributes.instanceStart,l=s.attributes.instanceEnd,u=Math.min(s.instanceCount,c.count),d=-t.near;W.at(1,I),I.w=1,I.applyMatrix4(t.matrixWorldInverse),I.applyMatrix4(i),I.multiplyScalar(1/I.w),I.x*=a.x/2,I.y*=a.y/2,I.z=0,L.copy(I),R.multiplyMatrices(t.matrixWorldInverse,o);for(let t=0,s=u;t<s;t++){if(P.fromBufferAttribute(c,t),F.fromBufferAttribute(l,t),P.w=1,F.w=1,P.applyMatrix4(R),F.applyMatrix4(R),P.z>d&&F.z>d)continue;if(P.z>d){let e=P.z-F.z,t=(P.z-d)/e;P.lerp(F,t)}else if(F.z>d){let e=F.z-P.z,t=(F.z-d)/e;F.lerp(P,t)}P.applyMatrix4(i),F.applyMatrix4(i),P.multiplyScalar(1/P.w),F.multiplyScalar(1/F.w),P.x*=a.x/2,P.y*=a.y/2,F.x*=a.x/2,F.y*=a.y/2,z.start.copy(P),z.start.z=0,z.end.copy(F),z.end.z=0;let s=z.closestPointToPointParameter(L,!0);z.at(s,B);let u=m.lerp(P.z,F.z,s),f=u>=-1&&u<=1,p=L.distanceTo(B)<G*.5;if(f&&p){z.start.fromBufferAttribute(c,t),z.end.fromBufferAttribute(l,t),z.start.applyMatrix4(o),z.end.applyMatrix4(o);let i=new r,a=new r;W.distanceSqToSegment(z.start,z.end,a,i),n.push({point:a,pointOnLine:i,distance:W.origin.distanceTo(a),object:e,face:null,faceIndex:t,uv:null,[T]:null})}}}var J=class extends c{constructor(e=new O,t=new A({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type=`LineSegments2`}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,r=new Float32Array(2*t.count);for(let e=0,i=0,a=t.count;e<a;e++,i+=2)M.fromBufferAttribute(t,e),N.fromBufferAttribute(n,e),r[i]=i===0?0:r[i-1],r[i+1]=r[i]+M.distanceTo(N);let i=new d(r,2,1);return e.setAttribute(`instanceDistanceStart`,new f(i,1,0)),e.setAttribute(`instanceDistanceEnd`,new f(i,1,1)),this}raycast(e,t){let n=this.material.worldUnits,r=e.camera;r===null&&!n&&console.error(`LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.`);let i=e.params.Line2===void 0?0:e.params.Line2.threshold||0;W=e.ray;let a=this.matrixWorld,o=this.geometry,s=this.material;G=s.linewidth+i,o.boundingSphere===null&&o.computeBoundingSphere(),H.copy(o.boundingSphere).applyMatrix4(a);let c;if(c=n?G*.5:K(r,Math.max(r.near,H.distanceToPoint(W.origin)),s.resolution),H.radius+=c,W.intersectsSphere(H)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),V.copy(o.boundingBox).applyMatrix4(a);let l;l=n?G*.5:K(r,Math.max(r.near,V.distanceToPoint(W.origin)),s.resolution),V.expandByScalar(l),W.intersectsBox(V)!==!1&&(n?q(this,t):te(this,r,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(j),this.material.uniforms.resolution.value.set(j.z,j.w))}},ne=class extends J{constructor(e=new k,t=new A({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type=`Line2`}},Y=e(t()),re=Y.forwardRef(function({points:e,color:t=16777215,vertexColors:n,linewidth:i,lineWidth:a,segments:o,dashed:s,...c},l){var d;let f=ee(e=>e.size),p=Y.useMemo(()=>o?new J:new ne,[o]),[m]=Y.useState(()=>new A),_=(n==null||(d=n[0])==null?void 0:d.length)===4?4:3,v=Y.useMemo(()=>{let i=o?new O:new k,a=e.map(e=>{let t=Array.isArray(e);return e instanceof r||e instanceof h?[e.x,e.y,e.z]:e instanceof g?[e.x,e.y,0]:t&&e.length===3?[e[0],e[1],e[2]]:t&&e.length===2?[e[0],e[1],0]:e});if(i.setPositions(a.flat()),n){t=16777215;let e=n.map(e=>e instanceof u?e.toArray():e);i.setColors(e.flat(),_)}return i},[e,o,n,_]);return Y.useLayoutEffect(()=>{p.computeLineDistances()},[e,p]),Y.useLayoutEffect(()=>{s?m.defines.USE_DASH=``:delete m.defines.USE_DASH,m.needsUpdate=!0},[s,m]),Y.useEffect(()=>()=>{v.dispose(),m.dispose()},[v]),Y.createElement(`primitive`,S({object:p,ref:l},c),Y.createElement(`primitive`,{object:v,attach:`geometry`}),Y.createElement(`primitive`,S({object:m,attach:`material`,color:t,vertexColors:!!n,resolution:[f.width,f.height],linewidth:i??a??1,dashed:s,transparent:_===4},c)))}),X=Y.forwardRef(({children:e,enabled:t=!0,speed:n=1,rotationIntensity:r=1,floatIntensity:i=1,floatingRange:a=[-.1,.1],autoInvalidate:o=!1,...s},c)=>{let l=Y.useRef(null);Y.useImperativeHandle(c,()=>l.current,[]);let u=Y.useRef(Math.random()*1e4);return x(e=>{if(!t||n===0)return;o&&e.invalidate();let s=u.current+e.clock.elapsedTime;l.current.rotation.x=Math.cos(s/4*n)/8*r,l.current.rotation.y=Math.sin(s/4*n)/8*r,l.current.rotation.z=Math.sin(s/4*n)/20*r;let c=Math.sin(s/4*n)/10;c=m.mapLinear(c,-.1,.1,a?.[0]??-.1,a?.[1]??.1),l.current.position.y=c*i,l.current.updateMatrix()}),Y.createElement(`group`,s,Y.createElement(`group`,{ref:l,matrixAutoUpdate:!1},e))}),Z=n(),ie=16,Q=1.7,$=[`#3a5cf0`,`#7c3aed`,`#0e7490`];function ae(){return(0,Y.useMemo)(()=>{let e=Math.PI*(3-Math.sqrt(5)),t=Array.from({length:ie},(t,n)=>{let i=1-n/15*2,a=Math.sqrt(Math.max(0,1-i*i)),o=e*n;return new r(Math.cos(o)*a*Q,i*Q,Math.sin(o)*a*Q)}),n=[];return t.forEach((e,r)=>{t.map((t,n)=>({j:n,d:r===n?1/0:e.distanceTo(t)})).sort((e,t)=>e.d-t.d).slice(0,2).forEach(({j:i})=>{i>r&&n.push([e,t[i]])})}),{nodes:t,edges:n}},[])}function oe(){let e=(0,Y.useRef)(null),{nodes:t,edges:n}=ae();return x(t=>{if(!e.current)return;let n=t.clock.getElapsedTime();e.current.rotation.y=n*.14+window.scrollY*5e-4,e.current.rotation.x=Math.sin(n*.15)*.12}),(0,Z.jsxs)(`group`,{ref:e,children:[n.map(([e,t],n)=>(0,Z.jsx)(re,{points:[e,t],color:`#3a5cf0`,lineWidth:1,transparent:!0,opacity:.35},n)),t.map((e,t)=>(0,Z.jsx)(X,{speed:1.2+t%3*.25,floatIntensity:.5,rotationIntensity:0,children:(0,Z.jsxs)(`mesh`,{position:e,children:[(0,Z.jsx)(`sphereGeometry`,{args:[t%4==0?.14:.09,24,24]}),(0,Z.jsx)(`meshStandardMaterial`,{color:$[t%$.length],roughness:.25,metalness:.5,emissive:$[t%$.length],emissiveIntensity:.4})]})},t))]})}function se(){let e=(0,Y.useRef)(null);return x(t=>{e.current&&(e.current.rotation.y=t.clock.getElapsedTime()*-.1+window.scrollY*4e-4)}),(0,Z.jsx)(`group`,{ref:e,children:[0,1,2].map(e=>(0,Z.jsx)(X,{speed:1+e*.3,floatIntensity:1.6,rotationIntensity:.4,children:(0,Z.jsxs)(`mesh`,{position:[Math.cos(e/3*Math.PI*2)*2.1,Math.sin(e/3*Math.PI*2)*1.6,-.8],children:[(0,Z.jsx)(`octahedronGeometry`,{args:[.1+e*.02,0]}),(0,Z.jsx)(`meshStandardMaterial`,{color:$[e],roughness:.3,metalness:.4,emissive:$[e],emissiveIntensity:.25})]})},e))})}function ce(){return(0,Z.jsxs)(v,{camera:{position:[0,0,5.5],fov:45},dpr:[1,1.75],gl:{antialias:!0,alpha:!0},children:[(0,Z.jsx)(`ambientLight`,{intensity:.8}),(0,Z.jsx)(`pointLight`,{position:[5,5,5],intensity:45,color:`#ffffff`}),(0,Z.jsx)(`pointLight`,{position:[-5,-3,-5],intensity:22,color:`#7c3aed`}),(0,Z.jsx)(`pointLight`,{position:[0,-4,3],intensity:12,color:`#3a5cf0`}),(0,Z.jsxs)(`group`,{position:[1.7,0,0],children:[(0,Z.jsx)(oe,{}),(0,Z.jsx)(se,{})]})]})}export{ce as HeroScene};
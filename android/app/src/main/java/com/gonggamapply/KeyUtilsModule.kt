package com.gonggamapply

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.kakao.sdk.common.util.Utility

class KeyUtilsModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "KeyUtilsModule"


    @ReactMethod
    fun getHashKey(promise: Promise) {
        try {
            val keyHash = Utility.getKeyHash(reactContext)
            promise.resolve(keyHash)
        } catch (e: Exception) {
            promise.reject("Error", e)
        }
    }
}

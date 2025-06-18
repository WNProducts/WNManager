const packages = Object.create(null)

Object.defineProperty(
    window, 'WN', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: new Proxy(
        {
            register(packageLabel, value) {
                const [packageName, version] = packageLabel.split(/@v/)
                packages[packageName] = { version, value }
            },
            getPackage(packageName, ...allowedVersions) {
                const packageObject = packages[packageName]
                if (!packageObject) throw new Error('Package `' + packageName + '` not found!')
                if (!allowedVersions.includes(packageObject.version)) throw new Error('Package `' + packageName + '@' + packageObject.version + '` does not match requirements!')
                return packageObject.value
            }
        },
        {
            get(t, p) {
                return t[p]
            }
        }
    )
}
)

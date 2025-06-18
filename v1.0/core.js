const packages = Object.create(null)

Object.defineProperty(
    window, 'WN', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: new Proxy(
        {
            register(package, value) {
                const [packageName, version] = package.split(/@v/)
                packages[packageName] = { version, value }
            },
            getPackage(packageName, ...allowedVersions) {
                const package = packages[packageName]
                if (!package) throw new Error('Package `' + packageName + '` not found!')
                if (!allowedVersions.includes(package.version)) throw new Error('Package `' + packageName + '@' + package.version + '` does not match requirements!')
                return package.value
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
